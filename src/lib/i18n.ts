// Static translations — no imports from store to avoid circular deps

export type Locale = "zh" | "en";

export const translations = {
  zh: {
    // Navigation
    nav: {
      home: "首页",
      dashboard: "仪表盘",
      analysis: "分析",
      feed: "资讯",
    },

    // Landing page
    landing: {
      hero: {
        badge: "财务自由计算器",
        title: "你距离",
        titleHighlight: "财务自由",
        titleSuffix: "还有多远？",
        subtitle:
          "输入你的收入、支出和净资产，我们用科学的FIRE计算方法，告诉你精确的退休时间线。",
        cta: "开始计算",
        ctaSub: "免费 · 无需注册 · 2分钟完成",
      },
      whatIsFire: {
        title: "什么是 FIRE？",
        subtitle:
          "FIRE（Financial Independence, Retire Early）是一种通过高储蓄率和智慧投资，实现提前退休、获得人生自由的财务哲学。",
        crossoverTitle: "财富交叉点",
        crossoverDesc: "当你的被动收入超过生活支出，你就实现了财务自由",
      },
      models: {
        title: "选择你的 FIRE 模式",
        subtitle: "不同的生活方式，对应不同的FIRE策略",
        lean: {
          title: "精简 FIRE",
          desc: "极简生活，最快实现自由",
          multiplier: "0.7× 支出",
        },
        regular: {
          title: "标准 FIRE",
          desc: "平衡生活品质与退休速度",
          multiplier: "1.0× 支出",
        },
        fat: {
          title: "肥猫 FIRE",
          desc: "富裕生活，奢华退休",
          multiplier: "1.5× 支出",
        },
        barista: {
          title: "咖啡师 FIRE",
          desc: "半退休，兼职补充收入",
          multiplier: "0.5× 支出",
        },
      },
      features: {
        title: "为什么选择我们",
        calc: {
          title: "精确计算引擎",
          desc: "基于NPER公式和实际收益率，考虑通货膨胀影响，提供精确到年的FIRE时间线。",
        },
        bilingual: {
          title: "中英双语支持",
          desc: "完整的中英文界面切换，适合海外华人和国际用户使用。",
        },
        scenarios: {
          title: "多场景模拟",
          desc: "4种FIRE模型，自定义假设参数，实时更新的可视化图表。",
        },
      },
      finalCta: {
        title: "准备好开始你的 FIRE 之旅了吗？",
        subtitle: "加入数千名正在计算财务自由的人",
        button: "立即开始计算",
      },
    },

    // Onboarding / Wizard
    onboarding: {
      steps: {
        0: {
          title: "你好！我们先了解一些基本信息",
          subtitle: "这些信息将帮助我们计算你的FIRE时间线",
        },
        1: {
          title: "你的收入和支出情况",
          subtitle: "使用税后年收入和实际年支出",
        },
        2: {
          title: "你目前的净资产",
          subtitle: "包括存款、股票、房产等所有资产减去负债",
        },
        3: {
          title: "选择你的 FIRE 模式",
          subtitle: "不同模式对应不同的生活方式和退休目标",
        },
        4: {
          title: "正在计算你的 FIRE 时间线...",
          subtitle: "分析你的财务状况",
        },
      },
      fields: {
        age: "当前年龄",
        agePlaceholder: "例如：30",
        income: "税后年收入（元）",
        incomePlaceholder: "例如：300000",
        expenses: "年支出（元）",
        expensesPlaceholder: "例如：150000",
        netWorth: "净资产（元）",
        netWorthPlaceholder: "例如：500000",
      },
      loading: [
        "分析收入支出比...",
        "计算复利增长曲线...",
        "模拟市场波动场景...",
        "生成FIRE时间线...",
        "即将完成...",
      ],
      next: "下一步",
      back: "返回",
      calculate: "计算我的FIRE时间线",
    },

    // Result page
    result: {
      title: "你的 FIRE 时间线",
      subtitle: "基于你输入的财务数据计算",
      kpis: {
        yearsToFire: "距离FIRE",
        fireAge: "预计退休年龄",
        fireNumber: "目标金额",
      },
      alreadyFired: {
        title: "恭喜！你已经实现了财务自由",
        subtitle: "你的净资产已超过FIRE目标金额",
      },
      negativeSavings: {
        title: "支出超过收入",
        subtitle: "请减少支出或增加收入以实现FIRE",
      },
      upsell: {
        title: "想要深入分析你的财务状况？",
        desc: "查看详细的投资组合建议、税务优化方案和个性化行动计划。",
        button: "查看完整仪表盘",
      },
      chartTitle: "财富增长预测",
    },

    // Dashboard
    dashboard: {
      tabs: {
        dashboard: "仪表盘",
        analysis: "分析报告",
        feed: "资讯",
      },
      fireModel: {
        title: "FIRE 模式",
        subtitle: "选择你的退休目标模式",
      },
      portfolio: {
        title: "投资组合",
        subtitle: "调整资产配置比例",
        stocks: "股票",
        bonds: "债券",
        cash: "现金",
        inputModePercent: "比例",
        inputModeAmount: "金额",
        addAsset: "添加资产",
        total: "总计",
        namePlaceholder: "资产名称",
      },
      expenses: {
        title: "支出明细",
        subtitle: "按类别规划退休月支出",
        monthlyTotal: "月合计",
        annualTotal: "年合计",
        addCategory: "添加类别",
        applyButton: "将此金额用于计算",
        alreadySynced: "已与计算同步",
        namePlaceholder: "类别名称",
      },
      assumptions: {
        title: "计算假设",
        nominalReturn: "名义收益率",
        inflationRate: "通货膨胀率",
        swr: "安全提取率",
      },
      inputs: {
        title: "财务数据",
        age: "年龄",
        income: "税后年收入",
        netWorth: "净资产",
        expenses: "年支出",
      },
    },

    // Analysis page
    analysis: {
      title: "财务健康分析",
      subtitle: "AI驱动的深度财务诊断",
      scanning: "正在扫描你的财务数据...",
      grade: "财务健康评级",
      redFlags: "需要注意的问题",
      actionSteps: "行动建议",
    },

    // Feed page
    feed: {
      title: "FIRE 资讯",
      subtitle: "为你量身定制的财务自由内容",
      categories: {
        all: "全部",
        strategy: "策略",
        investing: "投资",
        lifestyle: "生活方式",
        tax: "税务",
        mindset: "思维",
      },
      readTime: "分钟阅读",
    },

    // Common
    common: {
      currency: "¥",
      loading: "加载中...",
      error: "出错了",
      back: "返回",
      years: "年",
      age: "岁",
    },
  },

  en: {
    // Navigation
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      analysis: "Analysis",
      feed: "Feed",
    },

    // Landing page
    landing: {
      hero: {
        badge: "Financial Independence Calculator",
        title: "How far are you from",
        titleHighlight: "Financial Freedom",
        titleSuffix: "?",
        subtitle:
          "Enter your income, expenses, and net worth. We'll use proven FIRE methodology to calculate your exact retirement timeline.",
        cta: "Start Calculating",
        ctaSub: "Free · No signup · 2 minutes",
      },
      whatIsFire: {
        title: "What is FIRE?",
        subtitle:
          "FIRE (Financial Independence, Retire Early) is a financial philosophy of achieving early retirement through high savings rates and smart investing.",
        crossoverTitle: "The Crossover Point",
        crossoverDesc:
          "When your passive income exceeds your expenses, you've achieved financial independence",
      },
      models: {
        title: "Choose Your FIRE Model",
        subtitle: "Different lifestyles call for different FIRE strategies",
        lean: {
          title: "Lean FIRE",
          desc: "Minimalist living, fastest path to freedom",
          multiplier: "0.7× expenses",
        },
        regular: {
          title: "Regular FIRE",
          desc: "Balanced lifestyle and retirement speed",
          multiplier: "1.0× expenses",
        },
        fat: {
          title: "Fat FIRE",
          desc: "Wealthy lifestyle, luxurious retirement",
          multiplier: "1.5× expenses",
        },
        barista: {
          title: "Barista FIRE",
          desc: "Semi-retired with part-time income",
          multiplier: "0.5× expenses",
        },
      },
      features: {
        title: "Why Choose Us",
        calc: {
          title: "Precise Calculation Engine",
          desc: "Based on NPER formula and real returns, accounting for inflation, providing year-accurate FIRE timelines.",
        },
        bilingual: {
          title: "Bilingual Support",
          desc: "Full Chinese/English interface switching, perfect for overseas Chinese and international users.",
        },
        scenarios: {
          title: "Multi-Scenario Simulation",
          desc: "4 FIRE models, custom assumption parameters, and real-time visualization charts.",
        },
      },
      finalCta: {
        title: "Ready to Start Your FIRE Journey?",
        subtitle: "Join thousands calculating their path to financial freedom",
        button: "Start Calculating Now",
      },
    },

    // Onboarding / Wizard
    onboarding: {
      steps: {
        0: {
          title: "Hello! Let's start with some basics",
          subtitle: "This info will help us calculate your FIRE timeline",
        },
        1: {
          title: "Your income and expenses",
          subtitle: "Use after-tax annual income and actual annual spending",
        },
        2: {
          title: "Your current net worth",
          subtitle:
            "Include savings, stocks, real estate minus all liabilities",
        },
        3: {
          title: "Choose your FIRE model",
          subtitle: "Different models match different lifestyles and goals",
        },
        4: {
          title: "Calculating your FIRE timeline...",
          subtitle: "Analyzing your financial situation",
        },
      },
      fields: {
        age: "Current Age",
        agePlaceholder: "e.g., 30",
        income: "After-tax Annual Income (¥)",
        incomePlaceholder: "e.g., 300000",
        expenses: "Annual Expenses (¥)",
        expensesPlaceholder: "e.g., 150000",
        netWorth: "Net Worth (¥)",
        netWorthPlaceholder: "e.g., 500000",
      },
      loading: [
        "Analyzing income-to-expense ratio...",
        "Calculating compound growth curves...",
        "Simulating market scenarios...",
        "Generating FIRE timeline...",
        "Almost done...",
      ],
      next: "Next",
      back: "Back",
      calculate: "Calculate My FIRE Timeline",
    },

    // Result page
    result: {
      title: "Your FIRE Timeline",
      subtitle: "Calculated from your financial data",
      kpis: {
        yearsToFire: "Years to FIRE",
        fireAge: "Retirement Age",
        fireNumber: "FIRE Number",
      },
      alreadyFired: {
        title: "Congratulations! You've already achieved financial independence",
        subtitle: "Your net worth exceeds your FIRE target",
      },
      negativeSavings: {
        title: "Expenses Exceed Income",
        subtitle: "Reduce expenses or increase income to achieve FIRE",
      },
      upsell: {
        title: "Want a deeper financial analysis?",
        desc: "View detailed portfolio recommendations, tax optimization strategies, and a personalized action plan.",
        button: "View Full Dashboard",
      },
      chartTitle: "Wealth Growth Projection",
    },

    // Dashboard
    dashboard: {
      tabs: {
        dashboard: "Dashboard",
        analysis: "Analysis",
        feed: "Feed",
      },
      fireModel: {
        title: "FIRE Model",
        subtitle: "Choose your retirement target model",
      },
      portfolio: {
        title: "Portfolio",
        subtitle: "Adjust your asset allocation",
        stocks: "Stocks",
        bonds: "Bonds",
        cash: "Cash",
        inputModePercent: "Percent",
        inputModeAmount: "Amount",
        addAsset: "Add Asset",
        total: "Total",
        namePlaceholder: "Asset name",
      },
      expenses: {
        title: "Expense Breakdown",
        subtitle: "Plan monthly retirement spending by category",
        monthlyTotal: "Monthly Total",
        annualTotal: "Annual Total",
        addCategory: "Add Category",
        applyButton: "Apply to Calculation",
        alreadySynced: "In sync with calculation",
        namePlaceholder: "Category name",
      },
      assumptions: {
        title: "Assumptions",
        nominalReturn: "Nominal Return",
        inflationRate: "Inflation Rate",
        swr: "Safe Withdrawal Rate",
      },
      inputs: {
        title: "Key Financials",
        age: "Age",
        income: "After-tax Income",
        netWorth: "Net Worth",
        expenses: "Annual Expenses",
      },
    },

    // Analysis page
    analysis: {
      title: "Financial Health Analysis",
      subtitle: "AI-powered deep financial diagnostics",
      scanning: "Scanning your financial data...",
      grade: "Financial Health Grade",
      redFlags: "Issues to Address",
      actionSteps: "Action Steps",
    },

    // Feed page
    feed: {
      title: "FIRE Feed",
      subtitle: "Curated financial independence content for you",
      categories: {
        all: "All",
        strategy: "Strategy",
        investing: "Investing",
        lifestyle: "Lifestyle",
        tax: "Tax",
        mindset: "Mindset",
      },
      readTime: "min read",
    },

    // Common
    common: {
      currency: "¥",
      loading: "Loading...",
      error: "Something went wrong",
      back: "Back",
      years: "yrs",
      age: "years old",
    },
  },
} as const;

export type TranslationKeys = typeof translations;
