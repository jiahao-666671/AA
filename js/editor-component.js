/**
 * Editor Component - 代码编辑器组件
 * 基于CodeMirror，可重复使用，支持在每道题目/任务中独立嵌入
 */

const EditorComponent = {
  instances: new Map(),
  defaultConfig: {
    theme: 'monokai',
    mode: 'python',
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: true,
    autofocus: false
  },

  create(containerOrId, options = {}) {
    const container = typeof containerOrId === 'string' ?
      document.getElementById(containerOrId) : containerOrId;

    if (!container) {
      console.error('Editor container not found');
      return null;
    }

    const config = { ...this.defaultConfig, ...options };
    const wrapper = document.createElement('div');
    wrapper.className = 'editor-container';

    wrapper.innerHTML = `
      <div class="editor-toolbar">
        <button class="btn btn-primary btn-sm editor-run" title="运行代码 (Ctrl+Enter)">
          <span class="btn-icon-text">▶</span> 运行
        </button>
        <button class="btn btn-secondary btn-sm editor-format" title="格式化代码">
          <span class="btn-icon-text">⇋</span> 格式化
        </button>
        <button class="btn btn-secondary btn-sm editor-clear" title="清空代码">
          <span class="btn-icon-text">✕</span> 清空
        </button>
        <button class="btn btn-ghost btn-sm editor-reset" title="重置为模板">
          <span class="btn-icon-text">↺</span> 重置
        </button>
        <button class="btn btn-success btn-sm editor-dataset" title="导入电商数据" style="margin-left: auto;">
          <span class="btn-icon-text">📊</span> 导入数据
        </button>
      </div>
      <div class="editor-wrapper">
        <textarea class="editor-textarea"></textarea>
      </div>
      <div class="editor-output" id="${options.outputId || 'output-' + Date.now()}" style="display: none;">
        <div class="editor-output-header">
          <span class="editor-output-title">运行结果</span>
          <button class="btn btn-ghost btn-sm editor-copy-output" title="复制输出">
            📋
          </button>
        </div>
        <pre class="editor-output-content">等待运行...</pre>
      </div>
    `;

    container.appendChild(wrapper);

    const textarea = wrapper.querySelector('.editor-textarea');
    const outputDiv = wrapper.querySelector('.editor-output');
    const outputContent = wrapper.querySelector('.editor-output-content');
    const btnRun = wrapper.querySelector('.editor-run');
    const btnFormat = wrapper.querySelector('.editor-format');
    const btnClear = wrapper.querySelector('.editor-clear');
    const btnReset = wrapper.querySelector('.editor-reset');
    const btnDataset = wrapper.querySelector('.editor-dataset');
    const btnCopyOutput = wrapper.querySelector('.editor-copy-output');

    const editor = CodeMirror.fromTextArea(textarea, {
      mode: config.mode,
      theme: config.theme,
      lineNumbers: config.lineNumbers,
      indentUnit: config.indentUnit,
      tabSize: config.tabSize,
      indentWithTabs: config.indentWithTabs,
      lineWrapping: config.lineWrapping,
      autofocus: config.autofocus
    });

    if (config.initialCode) {
      editor.setValue(config.initialCode);
    }

    const instance = {
      editor,
      wrapper,
      outputDiv,
      outputContent,
      isRunning: false,
      templateCode: config.initialCode || '',
      lessonId: config.lessonId,

      getCode() { return editor.getValue(); },
      setCode(code) { editor.setValue(code); },
      clearOutput() {
        outputContent.textContent = '等待运行...';
        outputContent.className = 'editor-output-content';
      },
      showOutput(text, isError = false) {
        outputContent.textContent = text;
        outputContent.className = isError ? 'editor-output-content error' : 'editor-output-content';
        outputDiv.style.display = 'block';
      },
      showSuccess(text) { this.showOutput(text, false); },
      showError(text) { this.showOutput(text, true); },
      formatCode() {
        const code = this.getCode();
        const formatted = this.simpleFormat(code);
        this.setCode(formatted);
      },
      simpleFormat(code) {
        let indent = 0;
        return code.split('\n').map(line => {
          line = line.trim();
          if (/^(return|break|continue|pass|raise)/.test(line)) {
            indent = Math.max(0, indent - 1);
          }
          const result = '    '.repeat(indent) + line;
          if (line.endsWith(':')) {
            indent++;
          }
          return result;
        }).join('\n');
      },
      resetCode() {
        if (confirm('确定要重置为模板代码吗？')) {
          this.setCode(this.templateCode);
        }
      },
      destroy() {
        editor.toTextArea();
        wrapper.remove();
        EditorComponent.instances.delete(container);
      }
    };

    btnRun.addEventListener('click', async () => {
      if (instance.isRunning) return;
      instance.isRunning = true;
      btnRun.disabled = true;
      btnRun.innerHTML = '<span class="loading-spinner"></span> 运行中';

      const code = instance.getCode();

      if (config.lessonId) {
        StorageManager.saveCode(config.lessonId, code);
      }

      instance.clearOutput();

      const result = await PyodideRunner.run(code);

      if (result.success) {
        instance.showSuccess(result.output);
      } else {
        instance.showError(result.error || '运行失败');
      }

      instance.isRunning = false;
      btnRun.disabled = false;
      btnRun.innerHTML = '<span class="btn-icon-text">▶</span> 运行';

      if (config.onRun) {
        config.onRun(code, result);
      }
    });

    btnFormat.addEventListener('click', () => instance.formatCode());
    btnClear.addEventListener('click', () => {
      instance.clearOutput();
      outputDiv.style.display = 'none';
    });
    btnReset.addEventListener('click', () => instance.resetCode());

    btnDataset.addEventListener('click', async () => {
      btnDataset.disabled = true;
      btnDataset.innerHTML = '<span class="loading-spinner"></span> 导入中';

      const dataCode = `import pandas as pd
import numpy as np
np.random.seed(42)
print("正在生成电商数据...")
orders = pd.DataFrame({
    "订单ID": np.arange(1, 101),
    "用户ID": np.random.randint(1, 21, 100),
    "产品ID": np.random.randint(1, 6, 100),
    "数量": np.random.randint(1, 5, 100),
    "单价": np.random.uniform(10, 500, 100).round(2),
    "地区": np.random.choice(["华东","华南","华北","华中"], 100),
    "日期": pd.date_range("2024-01-01", periods=100, freq="D")
})
orders["总金额"] = orders["数量"] * orders["单价"]
print("数据生成完成！")
print(f"订单数: {len(orders)}")
print(f"总GMV: {orders['总金额'].sum().round(2)}")
print("\\n数据预览:")
print(orders.head())`;

      const result = await PyodideRunner.run(dataCode);
      if (result.success) {
        instance.showSuccess('数据导入成功！\n' + result.output);
      } else {
        instance.showError('数据导入失败：' + (result.error || '未知错误'));
      }

      btnDataset.disabled = false;
      btnDataset.innerHTML = '<span class="btn-icon-text">📊</span> 导入数据';
    });

    btnCopyOutput.addEventListener('click', () => {
      const text = outputContent.textContent;
      navigator.clipboard.writeText(text).then(() => {
        Toast.show('已复制到剪贴板', 'success');
      });
    });

    editor.addKeyMap({
      'Ctrl-Enter': () => btnRun.click(),
      'Cmd-Enter': () => btnRun.click()
    });

    this.instances.set(container, instance);
    if (config.onCreate) config.onCreate(instance);

    return instance;
  },

  getInstance(containerOrId) {
    const container = typeof containerOrId === 'string' ?
      document.getElementById(containerOrId) : containerOrId;
    return this.instances.get(container);
  },

  destroyAll() {
    this.instances.forEach(inst => inst.destroy());
    this.instances.clear();
  }
};

window.EditorComponent = EditorComponent;
