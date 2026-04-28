// 工具数据定义
const tools = [
    {
        id: 'calculator',
        name: '计算器',
        description: '支持加减乘除、百分比等基础计算功能',
        category: 'calculation',
        icon: 'fas fa-calculator',
        color: '#667eea',
        hotLevel: 1,
        usageCount: 12580
    },
    {
        id: 'dateTime',
        name: '时间日期查询',
        description: '查询当前时间、日期、星期、倒计时等',
        category: 'life',
        icon: 'fas fa-clock',
        color: '#4caf50',
        hotLevel: 2,
        usageCount: 9876
    },
    {
        id: 'caseConvert',
        name: '文字大小写转换',
        description: '一键转换文字大小写、首字母大写等',
        category: 'text',
        icon: 'fas fa-font',
        color: '#ff9800',
        hotLevel: 3,
        usageCount: 8765
    },
    {
        id: 'wordCount',
        name: '字数统计',
        description: '统计文字数量、字符数、行数等',
        category: 'text',
        icon: 'fas fa-list-ol',
        color: '#e91e63',
        hotLevel: 4,
        usageCount: 7654
    },
    {
        id: 'colorPicker',
        name: '颜色拾取',
        description: '选择颜色并获取HEX、RGB、HSL值',
        category: 'efficiency',
        icon: 'fas fa-palette',
        color: '#9c27b0',
        hotLevel: 5,
        usageCount: 6543
    },
    {
        id: 'qrCode',
        name: '二维码生成',
        description: '输入文本或网址生成二维码图片',
        category: 'efficiency',
        icon: 'fas fa-qrcode',
        color: '#00bcd4',
        hotLevel: 6,
        usageCount: 5432
    },
    {
        id: 'notepad',
        name: '简单记事本',
        description: '在线临时记录文字，支持保存多个笔记',
        category: 'efficiency',
        icon: 'fas fa-sticky-note',
        color: '#ffeb3b',
        hotLevel: 7,
        usageCount: 4321
    },
    {
        id: 'randomDraw',
        name: '随机抽签',
        description: '随机抽取数字、人名或自定义内容',
        category: 'fun',
        icon: 'fas fa-dice',
        color: '#f44336',
        hotLevel: 8,
        usageCount: 3210
    },
    {
        id: 'ageCalculator',
        name: '年龄计算',
        description: '根据出生日期计算年龄和详细信息',
        category: 'calculation',
        icon: 'fas fa-birthday-cake',
        color: '#8bc34a',
        hotLevel: 9,
        usageCount: 2109
    },
    {
        id: 'randomPassword',
        name: '随机密码生成',
        description: '生成高强度随机密码，可自定义规则',
        category: 'efficiency',
        icon: 'fas fa-key',
        color: '#03a9f4',
        hotLevel: 10,
        usageCount: 1098
    }
];

// 分类名称映射
const categoryNames = {
    'all': '全部工具',
    'calculation': '日常计算',
    'text': '文本处理',
    'life': '生活查询',
    'fun': '趣味工具',
    'efficiency': '效率辅助'
};

// 分类颜色映射
const categoryColors = {
    'calculation': '#667eea',
    'text': '#ff9800',
    'life': '#4caf50',
    'fun': '#f44336',
    'efficiency': '#9c27b0'
};

// 当前选中的分类
let currentCategory = 'all';

// DOM 元素
const categoryGrid = document.getElementById('categoryGrid');
const toolsGrid = document.getElementById('toolsGrid');
const hotToolsGrid = document.getElementById('hotToolsGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const searchResultsGrid = document.getElementById('searchResultsGrid');
const toolPanelOverlay = document.getElementById('toolPanelOverlay');
const toolPanelTitle = document.getElementById('toolPanelTitle');
const toolPanelContent = document.getElementById('toolPanelContent');
const closeToolPanel = document.getElementById('closeToolPanel');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    renderHotTools();
    renderTools();
    initEventListeners();
});

// 初始化事件监听器
function initEventListeners() {
    // 分类点击事件
    categoryGrid.addEventListener('click', function(e) {
        const categoryItem = e.target.closest('.category-item');
        if (categoryItem) {
            const category = categoryItem.dataset.category;
            setActiveCategory(category);
        }
    });

    // 搜索功能
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // 关闭工具面板
    closeToolPanel.addEventListener('click', hideToolPanel);
    toolPanelOverlay.addEventListener('click', function(e) {
        if (e.target === toolPanelOverlay) {
            hideToolPanel();
        }
    });

    // 键盘快捷键 - ESC 关闭面板
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && toolPanelOverlay.classList.contains('active')) {
            hideToolPanel();
        }
    });
}

// 设置活动分类
function setActiveCategory(category) {
    currentCategory = category;
    
    // 更新分类选中状态
    document.querySelectorAll('.category-item').forEach(item => {
        if (item.dataset.category === category) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 显示对应分类的工具
    renderTools();
    
    // 隐藏搜索结果
    searchResults.style.display = 'none';
}

// 渲染热门工具
function renderHotTools() {
    const hotTools = tools.sort((a, b) => a.hotLevel - b.hotLevel).slice(0, 6);
    
    hotToolsGrid.innerHTML = hotTools.map((tool, index) => `
        <div class="tool-card" data-tool-id="${tool.id}">
            <div class="tool-card-icon" style="background: ${tool.color}20; color: ${tool.color};">
                <i class="${tool.icon}"></i>
            </div>
            <div class="tool-card-name">${tool.name}</div>
            <div class="tool-card-desc">${tool.description}</div>
            <div class="tool-card-category">${categoryNames[tool.category]}</div>
            <div class="tool-card-rank">
                <i class="fas fa-fire"></i> 热度第 ${index + 1} 名
            </div>
        </div>
    `).join('');

    // 添加点击事件
    hotToolsGrid.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', function() {
            const toolId = this.dataset.toolId;
            openToolPanel(toolId);
        });
    });
}

// 渲染工具列表
function renderTools() {
    let filteredTools = tools;
    
    if (currentCategory !== 'all') {
        filteredTools = tools.filter(tool => tool.category === currentCategory);
    }
    
    toolsGrid.innerHTML = filteredTools.map(tool => `
        <div class="tool-card" data-tool-id="${tool.id}">
            <div class="tool-card-icon" style="background: ${tool.color}20; color: ${tool.color};">
                <i class="${tool.icon}"></i>
            </div>
            <div class="tool-card-name">${tool.name}</div>
            <div class="tool-card-desc">${tool.description}</div>
            <div class="tool-card-category">${categoryNames[tool.category]}</div>
        </div>
    `).join('');

    // 添加点击事件
    toolsGrid.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', function() {
            const toolId = this.dataset.toolId;
            openToolPanel(toolId);
        });
    });
}

// 处理搜索
function handleSearch() {
    const keyword = searchInput.value.trim().toLowerCase();
    
    if (!keyword) {
        searchResults.style.display = 'none';
        return;
    }

    const results = tools.filter(tool => 
        tool.name.toLowerCase().includes(keyword) || 
        tool.description.toLowerCase().includes(keyword)
    );

    if (results.length > 0) {
        searchResults.style.display = 'block';
        searchResultsGrid.innerHTML = results.map(tool => `
            <div class="tool-card" data-tool-id="${tool.id}">
                <div class="tool-card-icon" style="background: ${tool.color}20; color: ${tool.color};">
                    <i class="${tool.icon}"></i>
                </div>
                <div class="tool-card-name">${tool.name}</div>
                <div class="tool-card-desc">${tool.description}</div>
                <div class="tool-card-category">${categoryNames[tool.category]}</div>
            </div>
        `).join('');

        // 添加点击事件
        searchResultsGrid.querySelectorAll('.tool-card').forEach(card => {
            card.addEventListener('click', function() {
                const toolId = this.dataset.toolId;
                openToolPanel(toolId);
            });
        });
    } else {
        searchResults.style.display = 'block';
        searchResultsGrid.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
                <p>未找到匹配的工具，请尝试其他关键词</p>
            </div>
        `;
    }
}

// 打开工具面板
function openToolPanel(toolId) {
    const tool = tools.find(t => t.id === toolId);
    if (!tool) return;

    toolPanelTitle.textContent = tool.name;
    toolPanelContent.innerHTML = '';

    // 增加使用次数（模拟）
    tool.usageCount += 1;

    // 根据工具类型渲染不同内容
    switch (toolId) {
        case 'calculator':
            renderCalculator();
            break;
        case 'dateTime':
            renderDateTime();
            break;
        case 'caseConvert':
            renderCaseConvert();
            break;
        case 'wordCount':
            renderWordCount();
            break;
        case 'colorPicker':
            renderColorPicker();
            break;
        case 'qrCode':
            renderQrCode();
            break;
        case 'notepad':
            renderNotepad();
            break;
        case 'randomDraw':
            renderRandomDraw();
            break;
        case 'ageCalculator':
            renderAgeCalculator();
            break;
        case 'randomPassword':
            renderRandomPassword();
            break;
    }

    toolPanelOverlay.classList.add('active');
}

// 隐藏工具面板
function hideToolPanel() {
    toolPanelOverlay.classList.remove('active');
}

// ==================== 工具实现 ====================

// 计算器
function renderCalculator() {
    toolPanelContent.innerHTML = `
        <div class="calculator-display" id="calcDisplay">0</div>
        <div class="calculator">
            <button class="calculator-btn calculator-btn-function" data-action="clear">C</button>
            <button class="calculator-btn calculator-btn-function" data-action="backspace">⌫</button>
            <button class="calculator-btn calculator-btn-operator" data-action="percent">%</button>
            <button class="calculator-btn calculator-btn-operator" data-action="operator" data-value="/">÷</button>
            
            <button class="calculator-btn calculator-btn-number" data-action="number" data-value="7">7</button>
            <button class="calculator-btn calculator-btn-number" data-action="number" data-value="8">8</button>
            <button class="calculator-btn calculator-btn-number" data-action="number" data-value="9">9</button>
            <button class="calculator-btn calculator-btn-operator" data-action="operator" data-value="*">×</button>
            
            <button class="calculator-btn calculator-btn-number" data-action="number" data-value="4">4</button>
            <button class="calculator-btn calculator-btn-number" data-action="number" data-value="5">5</button>
            <button class="calculator-btn calculator-btn-number" data-action="number" data-value="6">6</button>
            <button class="calculator-btn calculator-btn-operator" data-action="operator" data-value="-">-</button>
            
            <button class="calculator-btn calculator-btn-number" data-action="number" data-value="1">1</button>
            <button class="calculator-btn calculator-btn-number" data-action="number" data-value="2">2</button>
            <button class="calculator-btn calculator-btn-number" data-action="number" data-value="3">3</button>
            <button class="calculator-btn calculator-btn-operator" data-action="operator" data-value="+">+</button>
            
            <button class="calculator-btn calculator-btn-number" data-action="number" data-value="0">0</button>
            <button class="calculator-btn calculator-btn-number" data-action="number" data-value=".">.</button>
            <button class="calculator-btn calculator-btn-success" data-action="equals" style="grid-column: span 2;">=</button>
        </div>
        <div class="tool-buttons" style="margin-top: 20px;">
            <button class="tool-btn tool-btn-secondary" id="calcCopy">复制结果</button>
            <button class="tool-btn tool-btn-secondary" id="calcClearAll">清空</button>
        </div>
    `;

    let currentValue = '0';
    let previousValue = '';
    let operation = null;
    let shouldResetDisplay = false;

    const display = document.getElementById('calcDisplay');

    function updateDisplay() {
        display.textContent = currentValue;
    }

    document.querySelectorAll('.calculator-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            const value = this.dataset.value;

            switch (action) {
                case 'number':
                    if (shouldResetDisplay) {
                        currentValue = value === '.' ? '0.' : value;
                        shouldResetDisplay = false;
                    } else {
                        if (value === '.' && currentValue.includes('.')) return;
                        currentValue = currentValue === '0' && value !== '.' ? value : currentValue + value;
                    }
                    break;
                case 'operator':
                    if (operation && !shouldResetDisplay) {
                        calculate();
                    }
                    previousValue = currentValue;
                    operation = value;
                    shouldResetDisplay = true;
                    break;
                case 'equals':
                    if (!operation) return;
                    calculate();
                    operation = null;
                    shouldResetDisplay = true;
                    break;
                case 'clear':
                    currentValue = '0';
                    previousValue = '';
                    operation = null;
                    shouldResetDisplay = false;
                    break;
                case 'backspace':
                    if (currentValue.length > 1) {
                        currentValue = currentValue.slice(0, -1);
                    } else {
                        currentValue = '0';
                    }
                    break;
                case 'percent':
                    currentValue = String(parseFloat(currentValue) / 100);
                    break;
            }
            updateDisplay();
        });
    });

    function calculate() {
        const prev = parseFloat(previousValue);
        const curr = parseFloat(currentValue);
        
        if (isNaN(prev) || isNaN(curr)) return;

        let result;
        switch (operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = curr !== 0 ? prev / curr : '错误';
                break;
        }
        
        currentValue = String(result);
    }

    document.getElementById('calcCopy').addEventListener('click', function() {
        copyToClipboard(currentValue);
    });

    document.getElementById('calcClearAll').addEventListener('click', function() {
        currentValue = '0';
        previousValue = '';
        operation = null;
        shouldResetDisplay = false;
        updateDisplay();
    });
}

// 时间日期查询
function renderDateTime() {
    toolPanelContent.innerHTML = `
        <div class="tool-result">
            <div class="tool-result-title">当前时间</div>
            <div class="tool-result-content" id="currentTime">--:--:--</div>
        </div>
        <div class="tool-result">
            <div class="tool-result-title">当前日期</div>
            <div class="tool-result-content" id="currentDate">----年--月--日</div>
        </div>
        <div class="tool-result">
            <div class="tool-result-title">星期</div>
            <div class="tool-result-content" id="currentWeek">星期--</div>
        </div>
        <div class="tool-result">
            <div class="tool-result-title">今年已过</div>
            <div class="tool-result-content" id="daysPassed">-- 天</div>
        </div>
        <div class="tool-operation">
            <label>倒计时查询（日期）</label>
            <input type="date" id="countdownDate">
        </div>
        <div class="tool-result" id="countdownResult" style="display: none;">
            <div class="tool-result-title">距离目标日期还有</div>
            <div class="tool-result-content" id="countdownDays">-- 天</div>
        </div>
        <div class="tool-buttons">
            <button class="tool-btn tool-btn-primary" id="calcCountdown">计算倒计时</button>
            <button class="tool-btn tool-btn-secondary" id="refreshTime">刷新时间</button>
        </div>
    `;

    function updateDateTime() {
        const now = new Date();
        
        // 更新时间
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;

        // 更新日期
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        document.getElementById('currentDate').textContent = `${year}年${month}月${day}日`;

        // 更新星期
        const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        document.getElementById('currentWeek').textContent = weeks[now.getDay()];

        // 更新已过天数
        const start = new Date(year, 0, 1);
        const diff = now - start;
        const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
        document.getElementById('daysPassed').textContent = `${daysPassed} 天`;
    }

    updateDateTime();
    const timeInterval = setInterval(updateDateTime, 1000);

    document.getElementById('calcCountdown').addEventListener('click', function() {
        const dateInput = document.getElementById('countdownDate').value;
        if (!dateInput) {
            alert('请选择目标日期');
            return;
        }

        const targetDate = new Date(dateInput);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const diff = targetDate - today;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        document.getElementById('countdownResult').style.display = 'block';
        document.getElementById('countdownDays').textContent = `${days > 0 ? days : '已过 ' + Math.abs(days)} 天`;
    });

    document.getElementById('refreshTime').addEventListener('click', updateDateTime);
}

// 文字大小写转换
function renderCaseConvert() {
    toolPanelContent.innerHTML = `
        <div class="tool-operation">
            <label>输入文字</label>
            <textarea id="caseInput" placeholder="请输入需要转换的文字..."></textarea>
        </div>
        <div class="tool-buttons">
            <button class="tool-btn tool-btn-primary" data-action="uppercase">转为大写</button>
            <button class="tool-btn tool-btn-primary" data-action="lowercase">转为小写</button>
            <button class="tool-btn tool-btn-primary" data-action="capitalize">首字母大写</button>
            <button class="tool-btn tool-btn-primary" data-action="sentence">句子大小写</button>
        </div>
        <div class="tool-result" id="caseResult" style="display: none; margin-top: 20px;">
            <div class="tool-result-title">转换结果</div>
            <div class="tool-result-content" id="caseOutput"></div>
        </div>
        <div class="tool-buttons" style="margin-top: 15px;">
            <button class="tool-btn tool-btn-success" id="caseCopy">复制结果</button>
            <button class="tool-btn tool-btn-secondary" id="caseClear">清空</button>
        </div>
    `;

    let lastResult = '';

    document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = document.getElementById('caseInput').value;
            let result = '';

            switch (this.dataset.action) {
                case 'uppercase':
                    result = input.toUpperCase();
                    break;
                case 'lowercase':
                    result = input.toLowerCase();
                    break;
                case 'capitalize':
                    result = input.replace(/\b\w/g, c => c.toUpperCase());
                    break;
                case 'sentence':
                    result = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
                    break;
            }

            lastResult = result;
            document.getElementById('caseResult').style.display = 'block';
            document.getElementById('caseOutput').textContent = result;
        });
    });

    document.getElementById('caseCopy').addEventListener('click', function() {
        if (lastResult) {
            copyToClipboard(lastResult);
        }
    });

    document.getElementById('caseClear').addEventListener('click', function() {
        document.getElementById('caseInput').value = '';
        document.getElementById('caseResult').style.display = 'none';
        lastResult = '';
    });
}

// 字数统计
function renderWordCount() {
    toolPanelContent.innerHTML = `
        <div class="tool-operation">
            <label>输入文字</label>
            <textarea id="wordCountInput" placeholder="请输入需要统计的文字..." style="min-height: 150px;"></textarea>
        </div>
        <div class="tool-buttons">
            <button class="tool-btn tool-btn-primary" id="countWords">统计字数</button>
            <button class="tool-btn tool-btn-secondary" id="clearWordCount">清空</button>
        </div>
        <div class="tool-result" style="margin-top: 20px;">
            <div class="tool-result-title">统计结果</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin-top: 10px;">
                <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">字符数（含空格）</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #667eea;" id="totalChars">0</div>
                </div>
                <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">字符数（不含空格）</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #667eea;" id="charsNoSpace">0</div>
                </div>
                <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">中文字符</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #667eea;" id="chineseChars">0</div>
                </div>
                <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">英文单词</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #667eea;" id="englishWords">0</div>
                </div>
                <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">行数</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #667eea;" id="lineCount">0</div>
                </div>
                <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">数字个数</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #667eea;" id="digitCount">0</div>
                </div>
            </div>
        </div>
    `;

    function countStats() {
        const text = document.getElementById('wordCountInput').value;
        
        // 字符数（含空格）
        document.getElementById('totalChars').textContent = text.length;
        
        // 字符数（不含空格）
        document.getElementById('charsNoSpace').textContent = text.replace(/\s/g, '').length;
        
        // 中文字符
        const chineseMatch = text.match(/[\u4e00-\u9fa5]/g);
        document.getElementById('chineseChars').textContent = chineseMatch ? chineseMatch.length : 0;
        
        // 英文单词
        const englishMatch = text.match(/[a-zA-Z]+/g);
        document.getElementById('englishWords').textContent = englishMatch ? englishMatch.length : 0;
        
        // 行数
        const lines = text.split('\n');
        document.getElementById('lineCount').textContent = lines.length;
        
        // 数字个数
        const digitMatch = text.match(/\d/g);
        document.getElementById('digitCount').textContent = digitMatch ? digitMatch.length : 0;
    }

    document.getElementById('countWords').addEventListener('click', countStats);
    
    document.getElementById('wordCountInput').addEventListener('input', countStats);

    document.getElementById('clearWordCount').addEventListener('click', function() {
        document.getElementById('wordCountInput').value = '';
        countStats();
    });
}

// 颜色拾取
function renderColorPicker() {
    toolPanelContent.innerHTML = `
        <div class="color-picker-container">
            <div class="color-preview" id="colorPreview" style="background: #667eea;"></div>
            <div class="color-inputs">
                <div class="color-input-group">
                    <label>HEX:</label>
                    <input type="text" id="hexInput" value="#667eea" maxlength="7">
                </div>
                <div class="color-input-group">
                    <label>RGB:</label>
                    <input type="text" id="rgbInput" value="rgb(102, 126, 234)" readonly>
                </div>
                <div class="color-input-group">
                    <label>HSL:</label>
                    <input type="text" id="hslInput" value="hsl(229, 76%, 66%)" readonly>
                </div>
            </div>
        </div>
        <div class="tool-operation" style="margin-top: 20px;">
            <label>颜色选择器</label>
            <input type="color" id="colorPicker" value="#667eea" style="width: 100%; height: 50px; cursor: pointer;">
        </div>
        <div class="tool-buttons" style="margin-top: 20px;">
            <button class="tool-btn tool-btn-primary" id="copyHex">复制 HEX</button>
            <button class="tool-btn tool-btn-primary" id="copyRgb">复制 RGB</button>
            <button class="tool-btn tool-btn-primary" id="copyHsl">复制 HSL</button>
            <button class="tool-btn tool-btn-secondary" id="resetColor">重置</button>
        </div>
    `;

    function updateColorFromHex(hex) {
        if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
        
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        // RGB
        document.getElementById('rgbInput').value = `rgb(${r}, ${g}, ${b})`;
        
        // HSL
        const rNorm = r / 255;
        const gNorm = g / 255;
        const bNorm = b / 255;
        
        const max = Math.max(rNorm, gNorm, bNorm);
        const min = Math.min(rNorm, gNorm, bNorm);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case rNorm:
                    h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
                    break;
                case gNorm:
                    h = ((bNorm - rNorm) / d + 2) / 6;
                    break;
                case bNorm:
                    h = ((rNorm - gNorm) / d + 4) / 6;
                    break;
            }
        }
        
        document.getElementById('hslInput').value = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
        
        // 预览
        document.getElementById('colorPreview').style.background = hex;
        document.getElementById('colorPicker').value = hex;
    }

    document.getElementById('colorPicker').addEventListener('input', function() {
        const hex = this.value;
        document.getElementById('hexInput').value = hex;
        updateColorFromHex(hex);
    });

    document.getElementById('hexInput').addEventListener('change', function() {
        let hex = this.value;
        if (!hex.startsWith('#')) {
            hex = '#' + hex;
        }
        if (hex.length === 4) {
            hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        this.value = hex;
        updateColorFromHex(hex);
    });

    document.getElementById('copyHex').addEventListener('click', function() {
        copyToClipboard(document.getElementById('hexInput').value);
    });

    document.getElementById('copyRgb').addEventListener('click', function() {
        copyToClipboard(document.getElementById('rgbInput').value);
    });

    document.getElementById('copyHsl').addEventListener('click', function() {
        copyToClipboard(document.getElementById('hslInput').value);
    });

    document.getElementById('resetColor').addEventListener('click', function() {
        document.getElementById('hexInput').value = '#667eea';
        updateColorFromHex('#667eea');
    });
}

// 二维码生成
function renderQrCode() {
    toolPanelContent.innerHTML = `
        <div class="tool-operation">
            <label>输入内容（文字或网址）</label>
            <textarea id="qrInput" placeholder="请输入要生成二维码的内容..."></textarea>
        </div>
        <div class="tool-operation">
            <label>二维码大小</label>
            <select id="qrSize">
                <option value="128">小 (128×128)</option>
                <option value="200" selected>中 (200×200)</option>
                <option value="256">大 (256×256)</option>
                <option value="300">超大 (300×300)</option>
            </select>
        </div>
        <div class="tool-buttons">
            <button class="tool-btn tool-btn-primary" id="generateQr">生成二维码</button>
            <button class="tool-btn tool-btn-secondary" id="clearQr">清空</button>
        </div>
        <div class="qr-container" id="qrContainer" style="display: none; margin-top: 20px;">
            <div class="qr-preview" id="qrPreview"></div>
            <div class="tool-buttons">
                <button class="tool-btn tool-btn-success" id="downloadQr">下载二维码</button>
                <button class="tool-btn tool-btn-secondary" id="copyQrUrl">复制内容</button>
            </div>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 0.9rem;">
            提示：支持使用 Google Charts API 生成二维码，需要网络连接
        </div>
    `;

    let currentQrUrl = '';
    let currentInput = '';

    document.getElementById('generateQr').addEventListener('click', function() {
        const input = document.getElementById('qrInput').value.trim();
        if (!input) {
            alert('请输入内容');
            return;
        }

        const size = document.getElementById('qrSize').value;
        currentInput = input;
        
        // 使用 Google Charts API 生成二维码
        const apiUrl = `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodeURIComponent(input)}`;
        currentQrUrl = apiUrl;

        const qrPreview = document.getElementById('qrPreview');
        qrPreview.innerHTML = `<img src="${apiUrl}" alt="二维码" style="max-width: 100%;">`;
        document.getElementById('qrContainer').style.display = 'flex';
    });

    document.getElementById('downloadQr').addEventListener('click', function() {
        if (currentQrUrl) {
            window.open(currentQrUrl, '_blank');
        }
    });

    document.getElementById('copyQrUrl').addEventListener('click', function() {
        if (currentInput) {
            copyToClipboard(currentInput);
        }
    });

    document.getElementById('clearQr').addEventListener('click', function() {
        document.getElementById('qrInput').value = '';
        document.getElementById('qrContainer').style.display = 'none';
        currentQrUrl = '';
        currentInput = '';
    });
}

// 简单记事本
function renderNotepad() {
    // 从 localStorage 加载笔记
    let notes = JSON.parse(localStorage.getItem('notepadNotes') || '[]');

    function renderNotesList() {
        const notesList = document.getElementById('notesList');
        if (notes.length === 0) {
            notesList.innerHTML = '<div style="color: #666; text-align: center; padding: 20px;">暂无笔记</div>';
            return;
        }

        notesList.innerHTML = notes.map((note, index) => `
            <div class="notepad-item" data-index="${index}">
                <div>
                    <div class="notepad-item-name">${note.title || '无标题'}</div>
                    <div class="notepad-item-date">${note.date}</div>
                </div>
                <div class="notepad-item-actions">
                    <button class="notepad-item-btn edit" data-action="edit" title="编辑">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="notepad-item-btn delete" data-action="delete" title="删除">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // 添加点击事件
        notesList.querySelectorAll('.notepad-item-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const index = parseInt(this.closest('.notepad-item').dataset.index);
                const action = this.dataset.action;

                if (action === 'edit') {
                    const note = notes[index];
                    document.getElementById('noteTitle').value = note.title || '';
                    document.getElementById('noteContent').value = note.content || '';
                    document.getElementById('currentNoteIndex').value = index;
                } else if (action === 'delete') {
                    if (confirm('确定要删除这条笔记吗？')) {
                        notes.splice(index, 1);
                        saveNotes();
                        renderNotesList();
                    }
                }
            });
        });
    }

    function saveNotes() {
        localStorage.setItem('notepadNotes', JSON.stringify(notes));
    }

    toolPanelContent.innerHTML = `
        <div class="notepad-container">
            <div class="notepad-header">
                <input type="text" class="notepad-title" id="noteTitle" placeholder="笔记标题（可选）">
                <input type="hidden" id="currentNoteIndex" value="-1">
            </div>
            <div class="tool-operation">
                <label>笔记内容</label>
                <textarea class="notepad-content" id="noteContent" placeholder="请输入笔记内容..."></textarea>
            </div>
            <div class="tool-buttons">
                <button class="tool-btn tool-btn-primary" id="saveNote">保存笔记</button>
                <button class="tool-btn tool-btn-secondary" id="newNote">新建笔记</button>
                <button class="tool-btn tool-btn-secondary" id="clearNote">清空内容</button>
                <button class="tool-btn tool-btn-success" id="copyNote">复制内容</button>
            </div>
            <div class="notepad-list" style="margin-top: 20px;">
                <div class="notepad-list-title">
                    <i class="fas fa-list"></i> 已保存的笔记 (${notes.length})
                </div>
                <div class="notepad-items" id="notesList"></div>
            </div>
        </div>
    `;

    renderNotesList();

    document.getElementById('saveNote').addEventListener('click', function() {
        const title = document.getElementById('noteTitle').value.trim();
        const content = document.getElementById('noteContent').value.trim();
        const currentIndex = parseInt(document.getElementById('currentNoteIndex').value);

        if (!content) {
            alert('请输入笔记内容');
            return;
        }

        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const note = {
            title: title,
            content: content,
            date: dateStr
        };

        if (currentIndex >= 0) {
            // 更新现有笔记
            notes[currentIndex] = note;
        } else {
            // 添加新笔记
            notes.unshift(note);
        }

        saveNotes();
        renderNotesList();
        showToast('笔记已保存');
    });

    document.getElementById('newNote').addEventListener('click', function() {
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteContent').value = '';
        document.getElementById('currentNoteIndex').value = '-1';
    });

    document.getElementById('clearNote').addEventListener('click', function() {
        document.getElementById('noteContent').value = '';
    });

    document.getElementById('copyNote').addEventListener('click', function() {
        const content = document.getElementById('noteContent').value;
        if (content) {
            copyToClipboard(content);
        }
    });
}

// 随机抽签
function renderRandomDraw() {
    let history = [];

    toolPanelContent.innerHTML = `
        <div class="draw-container">
            <div class="tool-operation" style="width: 100%;">
                <label>抽签方式</label>
                <select id="drawMode">
                    <option value="number">随机数字</option>
                    <option value="custom">自定义内容</option>
                </select>
            </div>
            
            <div id="numberMode" style="width: 100%;">
                <div class="draw-inputs">
                    <div class="tool-operation">
                        <label>最小值</label>
                        <input type="number" id="minNumber" value="1" min="0">
                    </div>
                    <div class="tool-operation">
                        <label>最大值</label>
                        <input type="number" id="maxNumber" value="100">
                    </div>
                    <div class="tool-operation">
                        <label>抽取个数</label>
                        <input type="number" id="drawCount" value="1" min="1" max="10">
                    </div>
                </div>
            </div>
            
            <div id="customMode" style="width: 100%; display: none;">
                <div class="tool-operation">
                    <label>输入选项（每行一个）</label>
                    <textarea id="customOptions" placeholder="选项1&#10;选项2&#10;选项3" style="min-height: 120px;"></textarea>
                </div>
                <div class="tool-operation">
                    <label>抽取个数</label>
                    <input type="number" id="customDrawCount" value="1" min="1" max="10">
                </div>
            </div>
            
            <div class="draw-result" id="drawResult">--</div>
            
            <div class="tool-buttons">
                <button class="tool-btn tool-btn-primary" id="startDraw">开始抽签</button>
                <button class="tool-btn tool-btn-secondary" id="clearDrawHistory">清空历史</button>
            </div>
            
            <div class="draw-history" style="width: 100%;" id="drawHistoryContainer" style="display: none;">
                <div class="draw-history-title">
                    <i class="fas fa-history"></i> 抽签历史
                </div>
                <div class="draw-history-list" id="drawHistoryList"></div>
            </div>
        </div>
    `;

    document.getElementById('drawMode').addEventListener('change', function() {
        const mode = this.value;
        document.getElementById('numberMode').style.display = mode === 'number' ? 'block' : 'none';
        document.getElementById('customMode').style.display = mode === 'custom' ? 'block' : 'none';
    });

    document.getElementById('startDraw').addEventListener('click', function() {
        const mode = document.getElementById('drawMode').value;
        let results = [];

        if (mode === 'number') {
            const min = parseInt(document.getElementById('minNumber').value);
            const max = parseInt(document.getElementById('maxNumber').value);
            const count = parseInt(document.getElementById('drawCount').value);

            if (min > max) {
                alert('最小值不能大于最大值');
                return;
            }

            if (count > (max - min + 1)) {
                alert('抽取个数不能超过数字范围');
                return;
            }

            // 生成不重复的随机数
            const numbers = [];
            for (let i = min; i <= max; i++) {
                numbers.push(i);
            }

            // 洗牌算法
            for (let i = numbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }

            results = numbers.slice(0, count);
        } else {
            const optionsText = document.getElementById('customOptions').value;
            const options = optionsText.split('\n').filter(opt => opt.trim());
            const count = parseInt(document.getElementById('customDrawCount').value);

            if (options.length === 0) {
                alert('请输入至少一个选项');
                return;
            }

            if (count > options.length) {
                alert('抽取个数不能超过选项数量');
                return;
            }

            // 洗牌算法
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }

            results = options.slice(0, count);
        }

        // 显示结果
        const resultStr = results.join('、');
        document.getElementById('drawResult').textContent = resultStr;

        // 添加到历史
        history.unshift(resultStr);
        if (history.length > 10) {
            history.pop();
        }

        // 显示历史
        document.getElementById('drawHistoryContainer').style.display = 'block';
        document.getElementById('drawHistoryList').innerHTML = history.map((item, index) => `
            <div class="draw-history-item">${index + 1}. ${item}</div>
        `).join('');
    });

    document.getElementById('clearDrawHistory').addEventListener('click', function() {
        history = [];
        document.getElementById('drawHistoryContainer').style.display = 'none';
        document.getElementById('drawResult').textContent = '--';
    });
}

// 年龄计算
function renderAgeCalculator() {
    toolPanelContent.innerHTML = `
        <div class="tool-operation">
            <label>出生日期</label>
            <input type="date" id="birthDate">
        </div>
        <div class="tool-buttons">
            <button class="tool-btn tool-btn-primary" id="calcAge">计算年龄</button>
            <button class="tool-btn tool-btn-secondary" id="clearAge">清空</button>
        </div>
        <div class="tool-result" id="ageResult" style="display: none; margin-top: 20px;">
            <div class="tool-result-title">年龄计算结果</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 10px;">
                <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">周岁年龄</div>
                    <div style="font-size: 2rem; font-weight: 700; color: #667eea;" id="ageYears">--</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">虚岁年龄</div>
                    <div style="font-size: 2rem; font-weight: 700; color: #667eea;" id="ageVirtual">--</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">总天数</div>
                    <div style="font-size: 2rem; font-weight: 700; color: #667eea;" id="ageDays">--</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">总月份</div>
                    <div style="font-size: 2rem; font-weight: 700; color: #667eea;" id="ageMonths">--</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">总周数</div>
                    <div style="font-size: 2rem; font-weight: 700; color: #667eea;" id="ageWeeks">--</div>
                </div>
                <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <div style="font-size: 0.85rem; color: #666;">生肖</div>
                    <div style="font-size: 2rem; font-weight: 700; color: #667eea;" id="ageZodiac">--</div>
                </div>
            </div>
            <div style="margin-top: 15px;">
                <div style="font-weight: 500; margin-bottom: 10px;">距离下一个生日还有</div>
                <div style="font-size: 1.5rem; color: #667eea; font-weight: 700;" id="nextBirthday">-- 天</div>
            </div>
        </div>
    `;

    document.getElementById('calcAge').addEventListener('click', function() {
        const birthDateStr = document.getElementById('birthDate').value;
        if (!birthDateStr) {
            alert('请选择出生日期');
            return;
        }

        const birthDate = new Date(birthDateStr);
        const today = new Date();

        if (birthDate > today) {
            alert('出生日期不能大于今天');
            return;
        }

        // 计算周岁
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            ageYears--;
        }

        // 计算虚岁
        const ageVirtual = today.getFullYear() - birthDate.getFullYear() + 1;

        // 计算总天数
        const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));

        // 计算总月份
        const totalMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());

        // 计算总周数
        const totalWeeks = Math.floor(totalDays / 7);

        // 计算生肖
        const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
        const zodiacIndex = (birthDate.getFullYear() - 1900) % 12;
        const zodiac = zodiacs[zodiacIndex >= 0 ? zodiacIndex : zodiacIndex + 12];

        // 计算下一个生日还有多少天
        let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBirthday <= today) {
            nextBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
        }
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

        // 显示结果
        document.getElementById('ageResult').style.display = 'block';
        document.getElementById('ageYears').textContent = ageYears + ' 岁';
        document.getElementById('ageVirtual').textContent = ageVirtual + ' 岁';
        document.getElementById('ageDays').textContent = totalDays.toLocaleString();
        document.getElementById('ageMonths').textContent = totalMonths;
        document.getElementById('ageWeeks').textContent = totalWeeks;
        document.getElementById('ageZodiac').textContent = zodiac;
        document.getElementById('nextBirthday').textContent = daysUntilBirthday + ' 天';
    });

    document.getElementById('clearAge').addEventListener('click', function() {
        document.getElementById('birthDate').value = '';
        document.getElementById('ageResult').style.display = 'none';
    });
}

// 随机密码生成
function renderRandomPassword() {
    toolPanelContent.innerHTML = `
        <div class="tool-operation">
            <label>密码长度 (4-32)</label>
            <input type="number" id="passwordLength" value="12" min="4" max="32">
        </div>
        <div class="tool-operation">
            <label>包含字符类型</label>
            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 10px;">
                <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
                    <input type="checkbox" id="includeLower" checked> 小写字母 (a-z)
                </label>
                <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
                    <input type="checkbox" id="includeUpper" checked> 大写字母 (A-Z)
                </label>
                <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
                    <input type="checkbox" id="includeNumbers" checked> 数字 (0-9)
                </label>
                <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
                    <input type="checkbox" id="includeSymbols"> 特殊字符 (!@#$%)
                </label>
            </div>
        </div>
        <div class="tool-buttons">
            <button class="tool-btn tool-btn-primary" id="generatePassword">生成密码</button>
            <button class="tool-btn tool-btn-secondary" id="clearPassword">清空</button>
        </div>
        <div class="tool-result" id="passwordResult" style="display: none; margin-top: 20px;">
            <div class="tool-result-title">生成的密码</div>
            <div class="tool-result-content" id="generatedPassword" style="word-break: break-all; font-family: monospace; font-size: 1.2rem;"></div>
        </div>
        <div class="tool-buttons" style="margin-top: 15px;">
            <button class="tool-btn tool-btn-success" id="copyPassword">复制密码</button>
        </div>
        <div class="tool-result" style="margin-top: 20px;">
            <div class="tool-result-title">密码强度</div>
            <div id="passwordStrength" style="margin-top: 10px;">
                <div style="height: 10px; background: #eee; border-radius: 5px; overflow: hidden;">
                    <div id="strengthBar" style="height: 100%; width: 0%; transition: width 0.3s;"></div>
                </div>
                <div style="margin-top: 10px; font-weight: 500;" id="strengthText">请生成密码</div>
            </div>
        </div>
    `;

    let lastPassword = '';

    function generatePassword() {
        const length = parseInt(document.getElementById('passwordLength').value);
        const includeLower = document.getElementById('includeLower').checked;
        const includeUpper = document.getElementById('includeUpper').checked;
        const includeNumbers = document.getElementById('includeNumbers').checked;
        const includeSymbols = document.getElementById('includeSymbols').checked;

        if (!includeLower && !includeUpper && !includeNumbers && !includeSymbols) {
            alert('请至少选择一种字符类型');
            return;
        }

        const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
        const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let allChars = '';
        let password = '';

        // 确保至少包含一个选中类型的字符
        if (includeLower) {
            allChars += lowerChars;
            password += lowerChars[Math.floor(Math.random() * lowerChars.length)];
        }
        if (includeUpper) {
            allChars += upperChars;
            password += upperChars[Math.floor(Math.random() * upperChars.length)];
        }
        if (includeNumbers) {
            allChars += numberChars;
            password += numberChars[Math.floor(Math.random() * numberChars.length)];
        }
        if (includeSymbols) {
            allChars += symbolChars;
            password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
        }

        // 生成剩余字符
        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // 打乱密码
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        lastPassword = password;

        document.getElementById('passwordResult').style.display = 'block';
        document.getElementById('generatedPassword').textContent = password;

        // 计算密码强度
        updatePasswordStrength(password, includeLower, includeUpper, includeNumbers, includeSymbols);
    }

    function updatePasswordStrength(password, hasLower, hasUpper, hasNumbers, hasSymbols) {
        let score = 0;
        const length = password.length;

        // 长度得分
        if (length >= 8) score += 1;
        if (length >= 12) score += 1;
        if (length >= 16) score += 1;

        // 字符类型得分
        if (hasLower) score += 1;
        if (hasUpper) score += 1;
        if (hasNumbers) score += 1;
        if (hasSymbols) score += 1;

        // 显示强度
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');

        let percentage, color, text;
        if (score <= 2) {
            percentage = 25;
            color = '#dc3545';
            text = '弱';
        } else if (score <= 4) {
            percentage = 50;
            color = '#ffc107';
            text = '中等';
        } else if (score <= 6) {
            percentage = 75;
            color = '#17a2b8';
            text = '强';
        } else {
            percentage = 100;
            color = '#28a745';
            text = '非常强';
        }

        strengthBar.style.width = percentage + '%';
        strengthBar.style.background = color;
        strengthText.textContent = `密码强度: ${text} (${percentage}%)`;
        strengthText.style.color = color;
    }

    document.getElementById('generatePassword').addEventListener('click', generatePassword);

    document.getElementById('copyPassword').addEventListener('click', function() {
        if (lastPassword) {
            copyToClipboard(lastPassword);
        }
    });

    document.getElementById('clearPassword').addEventListener('click', function() {
        document.getElementById('passwordResult').style.display = 'none';
        lastPassword = '';
        document.getElementById('strengthBar').style.width = '0%';
        document.getElementById('strengthText').textContent = '请生成密码';
        document.getElementById('strengthText').style.color = '#333';
    });
}

// 复制到剪贴板
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('已复制到剪贴板');
    }).catch(() => {
        // 备用方法
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('已复制到剪贴板');
    });
}

// 显示提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'copy-success';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 1500);
}
