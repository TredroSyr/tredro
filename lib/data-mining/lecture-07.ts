import type { Lecture } from "./types";

const BASKET_HEAD = ["TID", "Items"];
const BASKET_ROWS = [
  ["1", "Bread, Milk"],
  ["2", "Bread, Diaper, Juice, Eggs"],
  ["3", "Milk, Diaper, Juice, Coke"],
  ["4", "Bread, Milk, Diaper, Juice"],
  ["5", "Bread, Milk, Diaper, Coke"],
];

export const lecture07: Lecture = {
  n: 7,
  title: "التنقيب بواسطة قواعد الارتباط",
  en: "Association Rule Mining",
  summary:
    "ما هي قواعد الارتباط وتطبيقاتها (تحليل سلة التسوق)، شكل القاعدة والدعم والثقة، العتبات الصغرى، المفاهيم الأساسية (Itemset، Support count، Frequent itemset)، طريقة القوة العمياء، مرحلتا التنقيب، وتعقيد توليد العناصر المتكررة واستراتيجيات تخفيفه.",
  ideas: [
    {
      title: "لماذا قواعد الارتباط؟",
      en: "Motivation",
      blocks: [
        {
          type: "p",
          text: "أكثر استخدام لقواعد الارتباط هو **المجال التسويقي**: بيع العروض، تسويق مواد غير مستهلكة مع مواد مستهلكة، تصريف مواد اقترب موعد انتهاء صلاحيتها بأسرع وقت وأقل قيمة لتجنب الخسارة، و**ترتيب المواد ضمن المتجر**.",
        },
        {
          type: "example",
          text: "المواد اللازمة لصنع الكيك توضع بجانب بعضها في المتجر.",
        },
      ],
    },
    {
      title: "تعريف تنقيب قواعد الارتباط",
      en: "Association Rule Mining",
      blocks: [
        {
          type: "p",
          text: "هو عملية **إيجاد النماذج المتكررة**، أو **الارتباطات** `associations, correlations`، أو **البنى السببية**، بين مجموعات من العناصر الموجودة في **قواعد بيانات العمليات `transaction databases`**، أو قواعد البيانات العلائقية، أو أي مستودع معلومات آخر.",
        },
        {
          type: "p",
          text: "الـ **`transaction`** يمثل العناصر التي تجتمع مع بعضها. مثال: عند الشراء، كل المنتجات التي اشتريتها توضع في **سلة واحدة** بغض النظر عن محتواها.",
        },
        {
          type: "p",
          text: "**التطبيقات**: تحليل سلة التسوق `Basket data analysis` (**أهم تطبيق**)، التسويق المتقاطع `cross-marketing`، تصميم الكتالوج `catalog design`، تحليل الخسارة القيادية `loss-leader analysis`، ويمكن استخدامها أيضاً في **التصنيف والتجميع**.",
        },
      ],
    },
    {
      title: "شكل القاعدة: الجسم والرأس والدعم والثقة",
      en: "Rule Form",
      blocks: [
        {
          type: "formula",
          lines: ["Body → Head [support, confidence]"],
        },
        {
          type: "p",
          text: "**لكل قاعدة يجب معرفة قيمة الدعم وقيمة الثقة**. أمثلة:",
        },
        {
          type: "list",
          items: [
            "`buys(x, \"diaper\") → buys(x, \"juice\") [0.5%, 60%]`: من اشتروا حفاضات اشتروا أيضاً عصيراً، بدعم 0.5% وثقة 60%.",
            "`major(x, \"CS\") ∧ takes(x, \"DB\") → grade(x, \"A\") [1%, 75%]`: طالب علوم حاسب يدرس قواعد المعطيات يحصل على علامة A، بدعم 1% وثقة 75%، وهذا ليس اعتباطياً.",
          ],
        },
        {
          type: "note",
          text: "**السهم يشير إلى الترافق (الارتباط) وليس إلى السببية**.",
        },
      ],
    },
    {
      title: "تحليل سلة التسوق",
      en: "Market Basket Analysis",
      blocks: [
        {
          type: "p",
          text: "محلل البيانات يتساءل: **ما العناصر التي يختارها الزبائن معاً بشكل دائم؟** بهدف تجميعها. لديه سلال الزبائن: الأول اشترى حليب وطحين وذرة، والثاني حليب وخبز وسكر وبيض، وهكذا.",
        },
        {
          type: "p",
          text: "يحلل البيانات لمعرفة المنتجات التي تُشترى سوياً. **كلما تغيرت البيانات تغيرت النتائج**، وتوجهات الزبائن تختلف **حسب المكان**، فالبيانات قد تتغير لتغير المكان.",
        },
      ],
    },
    {
      title: "عتبتا الدعم والثقة الصغريان",
      en: "Minimum Support & Minimum Confidence",
      blocks: [
        {
          type: "p",
          text: "قواعد الارتباط تعطي الاهتمامات الموجودة في قاعدة البيانات **بما يتفق مع عتبة الدعم وعتبة الثقة**. العتبة هي **`minimum`**، ومحلل البيانات هو من **يحددها**.",
        },
        {
          type: "p",
          text: "**الهدف**: حذف القواعد ذات الدعم القليل والثقة القليلة، والتركيز على **المنتجات الأهم**. في قاعدة بيانات بملايين الزبائن ستستهلك الخوارزمية وقتاً طويلاً، فوضع العتبات **يقلص العدد ويسرّع التنفيذ** دون تأثير كبير على الجودة.",
        },
        {
          type: "p",
          text: "**الثمن**: نخسر **البيانات النادرة والشاذة**، مثل منتجين نادراً ما يُشتريان معاً.",
        },
        {
          type: "note",
          text: "إذا **لم تُحدد** عتبتا الدعم والثقة، نأخذ **كل العناصر** ولا يوجد حذف.",
        },
      ],
    },
    {
      title: "المفاهيم الأساسية وأمثلة تطبيقية",
      en: "Basic Concepts",
      blocks: [
        {
          type: "list",
          items: [
            "أولاً: يجب أن تكون لدينا **قاعدة بيانات**.",
            "ثانياً: كل **`transaction`** هو مجموعة من العناصر، مثل المنتجات التي اشتراها زبون واحد في زيارة واحدة.",
            "**المطلوب**: إيجاد كل القواعد التي تربط **مجموعة عناصر بمجموعة أخرى**، أي ليس بالضرورة منتجاً مع منتج.",
          ],
        },
        {
          type: "example",
          text: "98% من الأشخاص الذين يشترون إطارات أو إكسسوارات سيارات يطلبون خدمة (تغيير زيت أو غسيل سيارة)، فربط الخدمات معاً قد يدفع الزبائن لشراء المزيد. ومثال آخر: الحقيبة مع اللابتوب لها سعر، ولوحدها سعر أعلى.",
        },
      ],
    },
    {
      title: "تطبيقات بعلامة النجمة *",
      en: "Applications with *",
      blocks: [
        {
          type: "p",
          text: "**`* → Maintenance Agreement`**: النجمة **يساراً** تعني السؤال: ما المنتجات التي لها ارتباط قوي بخدمة الصيانة، لنربطها بها **ونزيد مبيعات الصيانة**؟ (من بيانات زبائن سابقين وليس اعتباطياً.)",
        },
        {
          type: "p",
          text: "**`Home Electronics → *`**: النجمة **يميناً**: الأجهزة الإلكترونية المنزلية **مبيعها عالٍ أساساً**، والسؤال: ما المنتجات الأخرى المرتبطة بها لنزيد مبيعاتها؟ (من الأكثر مبيعاً ← الأقل مبيعاً.)",
        },
        {
          type: "note",
          text: "السهم ليس سهم نتيجة، بل دليل على **ارتباط** بين الـ `body` والـ `head`.",
        },
      ],
    },
    {
      title: "الدعم والثقة",
      en: "Support & Confidence",
      blocks: [
        {
          type: "p",
          text: "**الدعم `Support` (S)**: احتمال شراء **كل العناصر معاً**، أي عدد الـ `transactions` التي تحتوي **جسم ورأس القاعدة معاً** ÷ **العدد الكلي** للـ `transactions`. قد يُعطى كعدد `count` أو كنسبة مئوية (وإذا كانت عتبة الدعم عدداً فلا داعي للقسمة). **الدعم احتمال عادي**.",
        },
        {
          type: "p",
          text: "**الثقة `Confidence` (C)**: عدد الـ `transactions` التي تحتوي **الجسم والرأس معاً** ÷ عدد الـ `transactions` التي تحتوي **الجسم فقط**. أي كم مرة تظهر عناصر `Y` في الـ `transactions` التي تحتوي `X`. **الثقة احتمال شرطي**.",
        },
        {
          type: "formula",
          lines: [
            "s(X → Y) = σ(X ∪ Y) / N",
            "c(X → Y) = σ(X ∪ Y) / σ(X)",
          ],
        },
        {
          type: "example",
          text: "4 transactions: `{A,B,C}` ، `{A,C}` ، `{A,D}` ، `{B,E,F}`. القاعدة `A → C`: الدعم = 2/4 = **50%**، الثقة = 2/3 = **66.6%** (ثلاثة فيها A، اثنان منها فيها C). أما `C → A`: **نفس الدعم** 50%، لكن الثقة = 2/2 = **100%**.",
        },
        {
          type: "note",
          text: "**عكس القاعدة لا يغيّر الدعم لكنه قد يغيّر الثقة**، لأن المقام يصبح عدد الـ transactions التي تحتوي الجسم الجديد.",
        },
      ],
    },
    {
      title: "تعريفات: Itemset و Support count و Frequent itemset",
      en: "Definitions",
      blocks: [
        {
          type: "list",
          items: [
            "**`Itemset`**: مجموعة من عنصر أو أكثر بين أقواس `{}`، مثل `{Milk, Bread, Diaper}`.",
            "**`k-itemset`**: مجموعة فيها `k` عنصراً. وإذا لم يُحدد `k` فهي كل الاحتمالات (عنصر أو أكثر).",
            "**`Support count (σ)`**: **عدد تكرارات** الـ itemset (الدعم كقيمة عددية)، مثل `σ({Milk, Bread, Diaper}) = 2`.",
            "**`Support (s)`**: عدد التكرارات ÷ عدد السجلات الكلي، مثل `s = 2/5 = 0.4`.",
            "**`Frequent Itemset`**: itemset دعمه **أكبر أو يساوي** العتبة الصغرى للدعم `minsup`.",
            "**`Association Rule`**: من الشكل `X → Y` حيث `X` و `Y` **itemsets** حكماً، مثل `{Milk, Diaper} → {Juice}`.",
          ],
        },
      ],
    },
    {
      title: "مثال سلة التسوق",
      en: "Market-Basket Transactions",
      blocks: [
        { type: "table", ltr: true, head: BASKET_HEAD, rows: BASKET_ROWS },
        {
          type: "p",
          text: "من القواعد التي تظهر: `{Diaper} → {Juice}` ، `{Milk, Bread} → {Eggs, Coke}` ، `{Juice, Bread} → {Milk}`.",
        },
        {
          type: "formula",
          lines: [
            "σ({Milk, Bread, Diaper}) = 2        (TID 4, 5)",
            "s = 2/5 = 0.4",
            "",
            "{Milk, Diaper} → {Juice}:",
            "s = σ(Milk, Diaper, Juice) / 5 = 2/5 = 0.4",
            "c = σ(Milk, Diaper, Juice) / σ(Milk, Diaper) = 2/3 = 0.67",
          ],
        },
      ],
    },
    {
      title: "مهمة التنقيب وطريقة القوة العمياء",
      en: "Association Rule Mining Task & Brute-Force",
      blocks: [
        {
          type: "p",
          text: "الهدف: إيجاد كل القواعد التي تحقق: **`support ≥ minsup`** و **`confidence ≥ minconf`**.",
        },
        {
          type: "p",
          text: "**طريقة القوة العمياء `Brute-Force Approach`**: تجلب **كل الاحتمالات الممكنة**:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "نأخذ **كل** القواعد الممكنة (كل احتمالات الارتباط).",
            "نحسب **الدعم والثقة** لكل قاعدة.",
            "نحذف القواعد التي تفشل في تحقيق `minsup` و `minconf`.",
          ],
        },
        {
          type: "p",
          text: "هي طريقة **مكلفة حسابياً** (هدر للوقت ولقوة المعالج) لأنها لا تستخدم أي خيارات لحذف حالات مبكراً.",
        },
      ],
    },
    {
      title: "نفس الدعم وثقة مختلفة",
      en: "Example of Rules",
      blocks: [
        {
          type: "formula",
          lines: [
            "{Milk, Diaper} → {Juice}   (s = 0.4, c = 0.67)",
            "{Milk, Juice}  → {Diaper}  (s = 0.4, c = 1.0)",
            "{Diaper, Juice} → {Milk}   (s = 0.4, c = 0.67)",
            "{Juice}  → {Milk, Diaper}  (s = 0.4, c = 0.67)",
            "{Diaper} → {Milk, Juice}   (s = 0.4, c = 0.5)",
            "{Milk}   → {Diaper, Juice} (s = 0.4, c = 0.5)",
          ],
        },
        {
          type: "p",
          text: "كل القواعد مكوّنة من نفس الـ itemset `{Milk, Diaper, Juice}` بترتيب مختلف، لذلك **الدعم واحد للكل** (يعتمد فقط على الـ itemset)، و**الاختلاف بالثقة**. ولهذا يمكن **الفصل بين الدعم والثقة**: نتحقق من الدعم أولاً على مستوى الـ itemset، ثم الثقة على مستوى القاعدة.",
        },
      ],
    },
    {
      title: "مرحلتا تنقيب قواعد الارتباط",
      en: "Mining Association Rules — Two-Step Approach",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**`Frequent Itemset Generation`**: توليد كل الـ itemsets التي **دعمها ≥ `minsup`** (نولّد كل الاحتمالات ونحافظ على ما يحقق العتبة).",
            "**`Rule Generation`**: من كل frequent itemset نولّد القواعد ذات **الثقة العالية** (`≥ minconf`).",
          ],
        },
        {
          type: "list",
          items: [
            "في المرحلة الأولى قد لا نختار أي عنصر (`null`)، أو كل عنصر لوحده، أو كل عنصرين، وهكذا.",
            "**الترتيب غير مهم**، وقواعد الارتباط **لا تهتم بالتسلسل الزمني** للشراء.",
            "ما زال **توليد الـ frequent itemsets مكلفاً**: عدد الاحتمالات `2ᵈ`.",
          ],
        },
      ],
    },
    {
      title: "توليد العناصر المتكررة بالقوة العمياء",
      en: "Frequent Itemset Generation",
      blocks: [
        {
          type: "p",
          text: "نأخذ في البداية **كل الاحتمالات الممكنة** للعناصر، وهذه القائمة هي **`Candidates`**، عددها `M = 2ᵈ` حيث `d` **عدد العناصر المختلفة** (نأخذ عدد المواد وليس تكرارها: `milk` مرة واحدة مهما تكرر).",
        },
        {
          type: "p",
          text: "نحسب الدعم لكل `Candidate` بمسح قاعدة البيانات، فإذا حقق العتبة نحافظ عليه وإلا نحذفه. في النهاية نحصل على الـ **`Frequent itemsets`**، وما زال الحساب مكلفاً.",
        },
        {
          type: "list",
          items: [
            "`N`: عدد الـ transactions.",
            "`M`: عدد الـ candidates `= 2ᵈ`.",
            "`w`: طول **أطول** transaction في قاعدة البيانات.",
          ],
        },
        { type: "formula", lines: ["M = 2ᵈ", "Complexity ~ O(N · M · w)"] },
        {
          type: "p",
          text: "التعقيد **يزداد بزيادة عدد الاحتمالات**.",
        },
        {
          type: "example",
          text: "`N = 5` والعنصران `{milk, coke}` ⇒ `d = 2` ⇒ `M = 2² = 4` احتمالات: `null` ، `{milk}` ، `{coke}` ، `{milk, coke}`.",
        },
      ],
    },
    {
      title: "استراتيجيات تخفيف التعقيد",
      en: "Frequent Itemset Generation Strategies",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**تقليل عدد الـ candidates `M`** (وهو `2ᵈ`) باستخدام تقنيات معينة لحذف المرشحين مبكراً.",
            "**تقليل عدد الـ transactions `N`**: لا نأخذ كل قاعدة البيانات بل جزءاً منها.",
            "**تقليل عدد المقارنات `NM`**: باستخدام **بنى بيانات فعالة** لتخزين الـ candidates والـ transactions، فلا نحتاج مقارنة كل transaction مع كل candidate.",
          ],
        },
        {
          type: "note",
          text: "في مرحلة توليد العناصر المتكررة **لا نأخذ الثقة بعين الاعتبار**، فقط الدعم.",
        },
      ],
    },
  ],
  laws: [
    {
      name: "Support count",
      formula: ["σ(X) = number of transactions containing X"],
      explain: "الدعم كعدد.",
      example: "σ({Milk, Bread, Diaper}) = 2",
    },
    {
      name: "Support",
      formula: ["s(X → Y) = σ(X ∪ Y) / N"],
      explain: "احتمال عادي: الجسم والرأس معاً ÷ كل الـ transactions. عكس القاعدة لا يغيّره.",
      example: "s({Milk, Diaper} → {Juice}) = 2/5 = 0.4",
    },
    {
      name: "Confidence",
      formula: ["c(X → Y) = σ(X ∪ Y) / σ(X)"],
      explain: "احتمال شرطي: الجسم والرأس معاً ÷ الـ transactions التي فيها الجسم.",
      example: "A → C: 2/3 = 66.6% ، C → A: 2/2 = 100%",
    },
    {
      name: "شرطا القاعدة القوية",
      formula: ["support ≥ minsup   AND   confidence ≥ minconf"],
      explain: "العتبتان يحددهما محلل البيانات. بدونهما لا يوجد حذف.",
    },
    {
      name: "Frequent itemset",
      formula: ["σ(X) / N ≥ minsup"],
      explain: "الثقة لا تدخل هنا.",
    },
    {
      name: "عدد الـ candidates والتعقيد",
      formula: ["M = 2ᵈ", "Brute-force ~ O(N · M · w)"],
      explain: "d عدد العناصر المختلفة، N عدد الـ transactions، w أطول transaction.",
      example: "d = 2 ⇒ M = 4 ، d = 6 ⇒ M = 64",
    },
    {
      name: "عدد القواعد الممكنة (من المرجع)",
      formula: ["R = 3ᵈ − 2ᵈ⁺¹ + 1"],
      explain:
        "معلومة إضافية من كتاب Tan توضح انفجار عدد القواعد مع d، وليست مذكورة نصاً في الملف الداعم.",
      example: "d = 6 ⇒ R = 729 − 128 + 1 = 602",
    },
  ],
  shortcuts: [
    "أهم تطبيق: **Market Basket Analysis**. وأيضاً cross-marketing، catalog design، loss-leader analysis.",
    "شكل القاعدة: **Body → Head [support, confidence]**.",
    "السهم = **ترافق/ارتباط** وليس **سببية**.",
    "**Support** = احتمال عادي = σ(X∪Y) / N. **Confidence** = احتمال شرطي = σ(X∪Y) / σ(X).",
    "عكس القاعدة X→Y إلى Y→X: **نفس الدعم**، الثقة **قد تتغير** (المقام σ(Y)).",
    "القواعد المبنية من **نفس الـ itemset** لها **نفس الدعم** ← نفصل الدعم عن الثقة.",
    "العتبات يحددها **المحلل**. فائدتها السرعة والتركيز، وثمنها خسارة **النادر والشاذ**. بدون عتبات ← لا حذف.",
    "**Frequent itemset** = دعمه **≥ minsup**.",
    "`* → X` = ماذا أبيع لأزيد X؟ ، `X → *` = X يبيع كثيراً، ماذا يرتبط به؟",
    "Brute-force: **كل القواعد ← احسب s و c ← احذف**. مكلف جداً.",
    "مرحلتان: **Frequent Itemset Generation** ثم **Rule Generation**.",
    "**M = 2ᵈ** candidates، التعقيد **O(NMw)**.",
    "تخفيف التعقيد: **قلّل M**، **قلّل N**، **قلّل المقارنات NM** ببنى بيانات فعالة.",
    "الترتيب والتسلسل الزمني للشراء **غير مهم** في قواعد الارتباط.",
  ],
  mcq: [
    {
      q: "أهم تطبيق لقواعد الارتباط:",
      options: [
        "تصنيف الصور",
        "تحليل سلة التسوق",
        "التنبؤ بالطقس",
        "ضغط البيانات",
      ],
      answer: 1,
      why: "Basket data analysis هو أهم تطبيق.",
    },
    {
      q: "السهم في القاعدة X → Y يعني:",
      options: ["X يسبب Y", "X و Y يترافقان", "Y يسبب X", "X يساوي Y"],
      answer: 1,
      why: "ارتباط وترافق وليس سببية.",
    },
    {
      q: "في القاعدة buys(diaper) → buys(juice) [0.5%, 60%]، القيمة 60% هي:",
      options: ["الدعم", "الثقة", "عدد الزبائن", "العتبة"],
      answer: 1,
      why: "الشكل [support, confidence].",
    },
    {
      q: "من يحدد عتبتي الدعم والثقة الصغريين؟",
      options: ["الخوارزمية تلقائياً", "محلل البيانات", "الزبون", "قاعدة البيانات"],
      answer: 1,
      why: "المحلل يحددها حسب هدفه.",
    },
    {
      q: "ما الذي نخسره عند رفع عتبة الدعم الصغرى؟",
      options: [
        "المنتجات الأكثر مبيعاً",
        "البيانات النادرة والشاذة",
        "كل القواعد",
        "لا نخسر شيئاً",
      ],
      answer: 1,
      why: "مثل منتجين نادراً ما يُشتريان معاً.",
    },
    {
      q: "الدعم Support هو:",
      options: ["احتمال شرطي", "احتمال عادي", "عدد العناصر", "طول الـ transaction"],
      answer: 1,
      why: "الثقة هي الاحتمال الشرطي.",
    },
    {
      q: "Transactions: {A,B,C}، {A,C}، {A,D}، {B,E,F}. دعم القاعدة A → C:",
      options: ["25%", "50%", "66.6%", "75%"],
      answer: 1,
      why: "A و C معاً في 2 من 4.",
    },
    {
      q: "بنفس البيانات، ثقة القاعدة A → C:",
      options: ["50%", "66.6%", "100%", "75%"],
      answer: 1,
      why: "2 (A و C معاً) ÷ 3 (فيها A).",
    },
    {
      q: "بنفس البيانات، ثقة القاعدة C → A:",
      options: ["50%", "66.6%", "100%", "25%"],
      answer: 2,
      why: "2 ÷ 2 (كل ما فيه C فيه A).",
    },
    {
      q: "عند عكس القاعدة X → Y إلى Y → X:",
      options: [
        "يتغير الدعم والثقة",
        "يبقى الدعم نفسه وقد تتغير الثقة",
        "تبقى الثقة نفسها ويتغير الدعم",
        "لا يتغير شيء أبداً",
      ],
      answer: 1,
      why: "الدعم يعتمد على X ∪ Y فقط، والثقة مقامها الجسم.",
    },
    {
      q: "Frequent Itemset هو itemset:",
      options: [
        "ثقته ≥ minconf",
        "دعمه ≥ minsup",
        "فيه عنصر واحد",
        "يظهر في كل الـ transactions",
      ],
      answer: 1,
      why: "الثقة لا تدخل في تعريفه.",
    },
    {
      q: "σ({Milk, Bread, Diaper}) = 2 في 5 transactions. الدعم s:",
      options: ["2", "0.2", "0.4", "0.67"],
      answer: 2,
      why: "2/5 = 0.4.",
    },
    {
      q: "6 قواعد مبنية من نفس الـ itemset {Milk, Diaper, Juice} لها:",
      options: [
        "نفس الثقة ودعم مختلف",
        "نفس الدعم وثقة مختلفة",
        "نفس الدعم والثقة",
        "دعم وثقة مختلفان",
      ],
      answer: 1,
      why: "ولهذا نفصل بين الدعم والثقة.",
    },
    {
      q: "المرحلة الأولى في تنقيب قواعد الارتباط:",
      options: [
        "Rule Generation",
        "Frequent Itemset Generation",
        "حساب الثقة",
        "التصنيف",
      ],
      answer: 1,
      why: "ثم نولّد القواعد ذات الثقة العالية.",
    },
    {
      q: "إذا كان عدد العناصر المختلفة d = 5، فإن عدد الـ candidates M:",
      options: ["10", "25", "32", "5"],
      answer: 2,
      why: "M = 2⁵ = 32 (يشمل المجموعة الخالية).",
    },
    {
      q: "تعقيد توليد العناصر المتكررة بالقوة العمياء:",
      options: ["O(N)", "O(N · M · w)", "O(M²)", "O(log N)"],
      answer: 1,
      why: "N transactions، M candidates، w أطول transaction.",
    },
    {
      q: "w في تعقيد O(NMw) تمثل:",
      options: [
        "عدد العناصر",
        "طول أطول transaction",
        "عتبة الدعم",
        "عدد القواعد",
      ],
      answer: 1,
      why: "أطول transaction ممكن في قاعدة البيانات.",
    },
    {
      q: "أي مما يلي ليس من استراتيجيات تخفيف تعقيد توليد العناصر المتكررة؟",
      options: [
        "تقليل عدد الـ candidates M",
        "تقليل عدد الـ transactions N",
        "تقليل المقارنات ببنى بيانات فعالة",
        "زيادة عتبة الثقة",
      ],
      answer: 3,
      why: "الثقة لا تُؤخذ بعين الاعتبار في مرحلة توليد العناصر المتكررة.",
    },
    {
      q: "القاعدة * → Maintenance Agreement تعني:",
      options: [
        "ما المنتجات التي تزيد مبيعات الصيانة؟",
        "ما الذي تسببه الصيانة؟",
        "الصيانة لا ترتبط بشيء",
        "كل المنتجات تسبب الصيانة",
      ],
      answer: 0,
      why: "النجمة يساراً = ما الذي نضعه في الجسم لزيادة الرأس.",
    },
    {
      q: "قواعد الارتباط تهتم بالتسلسل الزمني للشراء:",
      options: ["صح", "خطأ"],
      answer: 1,
      why: "الترتيب والتسلسل الزمني غير مهمين.",
    },
  ],
  exercises: [
    {
      title: "مثال 1: الدعم والثقة وعكس القاعدة (مثال المحاضرة)",
      problem: [
        {
          type: "p",
          text: "`minsup = 50%` و `minconf = 50%`. أوجد الـ frequent itemsets، ثم احسب الدعم والثقة لـ `A → C` و `C → A`:",
        },
        {
          type: "table",
          ltr: true,
          head: ["Transaction ID", "Items Bought"],
          rows: [
            ["2000", "A, B, C"],
            ["1000", "A, C"],
            ["4000", "A, D"],
            ["5000", "B, E, F"],
          ],
        },
      ],
      solution: [
        {
          type: "table",
          ltr: true,
          head: ["Itemset", "σ", "Support", "Frequent?"],
          rows: [
            ["{A}", "3", "75%", "✓"],
            ["{B}", "2", "50%", "✓"],
            ["{C}", "2", "50%", "✓"],
            ["{D}, {E}, {F}", "1", "25%", "✗"],
            ["{A, C}", "2", "50%", "✓"],
            ["{A, B}", "1", "25%", "✗"],
            ["{B, C}", "1", "25%", "✗"],
          ],
        },
        {
          type: "formula",
          lines: [
            "A → C : s = σ(A,C)/4 = 2/4 = 50%    c = σ(A,C)/σ(A) = 2/3 = 66.6%",
            "C → A : s = σ(A,C)/4 = 2/4 = 50%    c = σ(A,C)/σ(C) = 2/2 = 100%",
          ],
        },
        {
          type: "p",
          text: "القاعدتان تحققان `minsup = 50%` و `minconf = 50%`. لاحظ أن **الدعم لم يتغير** بالعكس، لكن **الثقة تغيرت** لأن المقام صار `σ(C)` بدل `σ(A)`.",
        },
      ],
      answer: "Frequent: {A}, {B}, {C}, {A,C} — A→C (50%, 66.6%) ، C→A (50%, 100%)",
    },
    {
      title: "مثال 2: Support count و Support و Confidence",
      problem: [
        { type: "p", text: "باستخدام بيانات سلة التسوق التالية:" },
        { type: "table", ltr: true, head: BASKET_HEAD, rows: BASKET_ROWS },
        {
          type: "p",
          text: "احسب: (أ) `σ({Milk, Bread, Diaper})` و `s`. (ب) الدعم والثقة للقاعدة `{Milk, Diaper} → {Juice}`.",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "(a) {Milk, Bread, Diaper} appears in TID 4, 5",
            "    σ = 2 ,  s = 2/5 = 0.4",
          ],
        },
        {
          type: "formula",
          lines: [
            "(b) σ(Milk, Diaper, Juice) → TID 3, 4      = 2",
            "    σ(Milk, Diaper)        → TID 3, 4, 5   = 3",
            "    s = 2/5 = 0.4",
            "    c = 2/3 = 0.67",
          ],
        },
        {
          type: "note",
          text: "خطأ شائع: القسمة في الثقة على **N** بدل **σ(الجسم)**. الثقة مقامها دائماً عدد الـ transactions التي تحتوي **الجسم**.",
        },
      ],
      answer: "(أ) σ = 2 ، s = 0.4 — (ب) s = 0.4 ، c = 0.67",
    },
    {
      title: "مثال 3: القواعد الست من itemset واحد وتصفيتها",
      problem: [
        {
          type: "p",
          text: "بنفس بيانات السلة، ولّد كل القواعد الممكنة من الـ itemset `{Milk, Diaper, Juice}`، واحسب لكل منها `s` و `c`. أي القواعد تبقى إذا كانت `minsup = 0.4` و `minconf = 0.6`؟",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "σ(Milk, Diaper, Juice) = 2  → s = 0.4 for ALL rules",
            "σ(Milk)=4  σ(Diaper)=4  σ(Juice)=3",
            "σ(Milk,Diaper)=3  σ(Milk,Juice)=2  σ(Diaper,Juice)=3",
          ],
        },
        {
          type: "table",
          ltr: true,
          head: ["Rule", "c", "c ≥ 0.6 ?"],
          rows: [
            ["{Milk, Diaper} → {Juice}", "2/3 = 0.67", "✓"],
            ["{Milk, Juice} → {Diaper}", "2/2 = 1.0", "✓"],
            ["{Diaper, Juice} → {Milk}", "2/3 = 0.67", "✓"],
            ["{Juice} → {Milk, Diaper}", "2/3 = 0.67", "✓"],
            ["{Diaper} → {Milk, Juice}", "2/4 = 0.5", "✗"],
            ["{Milk} → {Diaper, Juice}", "2/4 = 0.5", "✗"],
          ],
        },
        {
          type: "p",
          text: "كل القواعد تحقق الدعم (0.4)، والتصفية حصلت **بالثقة فقط**. هذا يوضح لماذا نفصل المرحلتين: نتأكد من الدعم مرة واحدة للـ itemset، ثم نفحص ثقة كل قاعدة.",
        },
      ],
      answer: "تبقى 4 قواعد، وتُحذف {Diaper}→{Milk,Juice} و {Milk}→{Diaper,Juice} (ثقة 0.5)",
    },
    {
      title: "مثال 4: توليد الـ Frequent itemsets بالقوة العمياء",
      problem: [
        {
          type: "p",
          text: "بنفس بيانات السلة و `minsup count = 3`، أوجد كل الـ frequent 1-itemsets و 2-itemsets، وهل يوجد frequent 3-itemset؟",
        },
      ],
      solution: [
        {
          type: "table",
          ltr: true,
          head: ["1-itemset", "σ", "≥ 3 ?"],
          rows: [
            ["Bread", "4", "✓"],
            ["Milk", "4", "✓"],
            ["Diaper", "4", "✓"],
            ["Juice", "3", "✓"],
            ["Coke", "2", "✗"],
            ["Eggs", "1", "✗"],
          ],
        },
        {
          type: "table",
          ltr: true,
          head: ["2-itemset", "TIDs", "σ", "≥ 3 ?"],
          rows: [
            ["{Bread, Milk}", "1, 4, 5", "3", "✓"],
            ["{Bread, Diaper}", "2, 4, 5", "3", "✓"],
            ["{Bread, Juice}", "2, 4", "2", "✗"],
            ["{Milk, Diaper}", "3, 4, 5", "3", "✓"],
            ["{Milk, Juice}", "3, 4", "2", "✗"],
            ["{Diaper, Juice}", "2, 3, 4", "3", "✓"],
          ],
        },
        {
          type: "p",
          text: "مرشحو الـ 3-itemset مثل `{Bread, Milk, Diaper}` له `σ = 2` (TID 4, 5) و `{Milk, Diaper, Juice}` له `σ = 2`، فلا يوجد frequent 3-itemset.",
        },
        {
          type: "note",
          text: "بالقوة العمياء نفحص **كل** الـ `2⁶ = 64` candidate لـ 6 عناصر. لاحظ أن أي مجموعة تحتوي `Coke` أو `Eggs` لا يمكن أن تكون متكررة لأن العنصر لوحده غير متكرر، وهذه فكرة **تقليل M** (أساس خوارزمية Apriori).",
        },
      ],
      answer: "Frequent: {Bread}, {Milk}, {Diaper}, {Juice}, {Bread,Milk}, {Bread,Diaper}, {Milk,Diaper}, {Diaper,Juice} — لا يوجد 3-itemset",
    },
    {
      title: "مثال 5: عدد الـ Candidates والتعقيد",
      problem: [
        {
          type: "p",
          text: "(أ) اكتب كل الـ candidates للعنصرين `{milk, coke}`. (ب) كم candidate لبيانات السلة (6 عناصر)؟ (ج) إذا كان `N = 1000` و `w = 4`، ما رتبة عدد المقارنات بالقوة العمياء؟",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "(a) d = 2 → M = 2² = 4 :  null , {milk} , {coke} , {milk, coke}",
            "(b) d = 6 → M = 2⁶ = 64",
            "(c) O(N · M · w) = 1000 × 64 × 4 = 256,000",
          ],
        },
        {
          type: "p",
          text: "إضافة عنصر واحد فقط **تضاعف** `M`، لذلك التعقيد ينفجر مع زيادة العناصر، ومن هنا الحاجة لاستراتيجيات تقليل `M` و `N` والمقارنات.",
        },
      ],
      answer: "(أ) 4 candidates ، (ب) 64 ، (ج) ≈ 256,000 مقارنة",
    },
    {
      title: "مثال 6: تفسير قاعدة بالأرقام",
      problem: [
        {
          type: "p",
          text: "قاعدة بيانات فيها `10,000` transaction، والقاعدة `buys(diaper) → buys(juice) [0.5%, 60%]`. كم transaction تحتوي الحفاضات والعصير معاً؟ وكم transaction تحتوي الحفاضات؟",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "σ(diaper, juice) = s × N = 0.005 × 10,000 = 50",
            "c = σ(diaper, juice) / σ(diaper)",
            "σ(diaper) = 50 / 0.6 ≈ 83",
          ],
        },
        {
          type: "p",
          text: "أي 50 عملية شراء فيها المنتجان معاً، ومن حوالي 83 عملية فيها حفاضات، 60% منها فيها عصير أيضاً.",
        },
      ],
      answer: "50 transaction فيها الاثنان ، ≈ 83 transaction فيها حفاضات",
    },
  ],
};
