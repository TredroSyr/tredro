import type { Lecture } from "./types";

const TRAIN_HEAD = ["Tid", "Refund", "Marital Status", "Taxable Income", "Cheat"];
const TRAIN_ROWS = [
  ["1", "Yes", "Single", "125K", "No"],
  ["2", "No", "Married", "100K", "No"],
  ["3", "No", "Single", "70K", "No"],
  ["4", "Yes", "Married", "120K", "No"],
  ["5", "No", "Divorced", "95K", "Yes"],
  ["6", "No", "Married", "60K", "No"],
  ["7", "Yes", "Divorced", "220K", "No"],
  ["8", "No", "Single", "85K", "Yes"],
  ["9", "No", "Married", "75K", "No"],
  ["10", "No", "Single", "90K", "Yes"],
];

export const lecture05: Lecture = {
  n: 5,
  title: "التصنيف وأشجار القرار",
  en: "Classification & Decision Trees",
  summary:
    "مهمة التصنيف وبناء النموذج (تدريب/اختبار)، تقنيات التصنيف، أشجار القرار وخوارزمية Hunt، شروط الاختبار حسب نوع الصفة، مقاييس عدم النقاء (Gini، Entropy، Classification Error)، Information Gain و Gain Ratio، ومزايا وعيوب أشجار القرار.",
  ideas: [
    {
      title: "ما هو التصنيف؟",
      en: "Classification: Definition",
      blocks: [
        {
          type: "p",
          text: "لدينا مجموعة سجلات تسمى **مجموعة التدريب**، كل سجل يتميز بـ **زوج مرتب `(x, y)`**: `x` هي **مجموعة السمات** و `y` هي **تصنيف الفئة**.",
        },
        {
          type: "list",
          items: [
            "`x` تسمى أيضاً: `feature`، `independent variable`، `input`.",
            "`y` تسمى أيضاً: `class`، `response`، `dependent variable`، `output`.",
          ],
        },
        {
          type: "p",
          text: "**المهمة**: تعلّم نموذج يربط كل مجموعة سمات `x` بإحدى التصنيفات **المحددة مسبقاً** `y`.",
        },
        {
          type: "table",
          head: ["المهمة", "مجموعة السمات x", "التصنيف y"],
          rows: [
            [
              "تصنيف رسائل البريد",
              "ميزات من رأس الرسالة ومحتواها",
              "`spam` أو `non-spam`",
            ],
            [
              "تحديد الخلايا السرطانية",
              "ميزات من الأشعة السينية أو الرنين المغناطيسي",
              "خبيثة أو حميدة",
            ],
            [
              "تصنيف المجرات",
              "ميزات من صور التلسكوب",
              "إهليلجية، حلزونية، أو غير منتظمة",
            ],
          ],
        },
      ],
    },
    {
      title: "النهج العام لبناء نموذج التصنيف",
      en: "General Approach for Building a Classification Model",
      blocks: [
        {
          type: "p",
          text: "نقسم البيانات إلى **`training dataset`** و **`testing dataset`** بنسبة **70% و 30%** (أو نسب أخرى).",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**التعلّم (الاستقراء `Induction`)**: نمرر بيانات التدريب لخوارزمية التعلّم فتبني النموذج.",
            "**الاستنتاج `Deduction`**: نمرر بيانات الاختبار للنموذج ونقارن نتيجته مع **النتيجة الواقعية**.",
          ],
        },
        {
          type: "p",
          text: "كلما زاد عدد الحالات التي توقعها النموذج **بشكل صحيح** زادت **دقة النموذج**.",
        },
      ],
    },
    {
      title: "تقنيات التصنيف",
      en: "Classification Techniques",
      blocks: [
        { type: "p", text: "**المصنّفات الأساسية `Base Classifiers`**:" },
        {
          type: "list",
          items: [
            "`Decision Tree based Methods`",
            "`Rule-based Methods`",
            "`Nearest-neighbor`",
            "`Naïve Bayes` و `Bayesian Belief Networks`",
            "`Support Vector Machines`",
            "`Neural Networks` و `Deep Neural Nets`",
          ],
        },
        {
          type: "p",
          text: "**المصنّفات التجميعية `Ensemble Classifiers`**: `Boosting`، `Bagging`، `Random Forests`.",
        },
      ],
    },
    {
      title: "مثال شجرة القرار وتطبيقها على بيانات الاختبار",
      en: "Example of a Decision Tree",
      blocks: [
        {
          type: "p",
          text: "بيانات تدريب لـ 10 أشخاص، والصفة الهدف `Cheat` (هل تهرّب ضريبياً):",
        },
        { type: "table", ltr: true, head: TRAIN_HEAD, rows: TRAIN_ROWS },
        {
          type: "p",
          text: "**صفات التقسيم `Splitting Attributes`**: الجذر `Refund`: إذا `Yes` ← `NO`. إذا `No` ← نختبر `MarSt`: إذا `Married` ← `NO`. إذا `Single` أو `Divorced` ← نختبر `TaxInc`: `< 80K` ← `NO`، `> 80K` ← `YES`.",
        },
        {
          type: "formula",
          lines: [
            "Refund?",
            "├─ Yes → NO",
            "└─ No  → MarSt?",
            "         ├─ Married → NO",
            "         └─ Single, Divorced → TaxInc?",
            "                               ├─ < 80K → NO",
            "                               └─ > 80K → YES",
          ],
        },
        {
          type: "p",
          text: "**تطبيق النموذج على سجل اختبار**: نبدأ من **الجذر** ونتبع الفرع المطابق لقيمة كل صفة حتى نصل لـ **ورقة**، فتكون قيمة الورقة هي التصنيف.",
        },
        {
          type: "p",
          text: "**شجرة أخرى لنفس البيانات**: يمكن أن يكون الجذر `MarSt` بدلاً من `Refund`. أي **قد توجد أكثر من شجرة تناسب نفس البيانات**، متشابهة بنسبة معينة وليست بالضرورة متطابقة، وتكون إحداها أفضل من الأخرى حسب **نقاء العقد**.",
        },
      ],
    },
    {
      title: "خوارزميات بناء شجرة القرار وخوارزمية Hunt",
      en: "Decision Tree Induction — Hunt's Algorithm",
      blocks: [
        {
          type: "p",
          text: "خوارزميات كثيرة: `Hunt's Algorithm` (من أقدمها، سُميت نسبة للعالم Hunt)، `CART`، `ID3` و `C4.5`، `SLIQ` و `SPRINT`.",
        },
        {
          type: "p",
          text: "**الهيكل العام لـ Hunt**: لتكن `Dt` مجموعة سجلات التدريب التي تصل إلى العقدة `t`:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "إذا كانت كل سجلات `Dt` تنتمي **لنفس الفئة** `yt` ← العقدة `t` **ورقة `leaf node`** موسومة بـ `yt`.",
            "إذا كانت `Dt` تحتوي سجلات من **أكثر من فئة** ← نستخدم **اختبار سمة `attribute test`** لتقسيم البيانات إلى مجموعات أصغر، ونطبق الإجراء **بشكل تكراري** على كل مجموعة فرعية.",
          ],
        },
      ],
    },
    {
      title: "قضايا تصميم بناء الشجرة",
      en: "Design Issues of Decision Tree Induction",
      blocks: [
        {
          type: "p",
          text: "**١. كيف نقسم سجلات التدريب؟** نحتاج طريقة للتعبير عن **شرط الاختبار** حسب **نوع السمة**، ومقياساً لتقييم **جودة** شرط الاختبار.",
        },
        {
          type: "p",
          text: "**٢. متى نتوقف عن التقسيم؟** عندما تنتمي كل السجلات **لنفس الفئة** أو تكون لها **قيم سمات متطابقة**، أو عبر **الإنهاء المبكر `Early termination`**.",
        },
      ],
    },
    {
      title: "شروط الاختبار حسب نوع السمة",
      en: "Methods for Expressing Test Conditions",
      blocks: [
        {
          type: "p",
          text: "تعتمد على نوع السمة: `Binary`، `Nominal`، `Ordinal`، `Continuous`.",
        },
        {
          type: "p",
          text: "**السمات الاسمية `Nominal`**: **`Multi-way split`**: عدد أقسام = عدد القيم المختلفة (مثلاً `Family | Sports | Luxury`). أو **`Binary split`**: نقسم القيم إلى مجموعتين (مثلاً `{Sports, Luxury} | {Family}`).",
        },
        {
          type: "p",
          text: "**السمات الترتيبية `Ordinal`**: `Multi-way split` بعدد القيم، أو `Binary split` بشرط **المحافظة على الترتيب**. مثلاً للمقاس `Small < Medium < Large < XL`: التقسيم `{Small, Medium} | {Large, XL}` صحيح، أما `{Small, Large} | {Medium, XL}` **خاطئ** لأنه يكسر الترتيب.",
        },
        {
          type: "p",
          text: "**السمات المستمرة `Continuous`**: نقسمها إلى مجالات (تقطيع)، فتصبح ترتيبية.",
        },
        {
          type: "list",
          items: [
            "اختلاف البيانات يؤدي لاختلاف النتائج.",
            "لا نحكم أن خوارزمية هي الأفضل إلا بعد **تجريب كل الخوارزميات** على نفس البيانات وأخذ الدقة الأعلى.",
            "يجب **تقييم طريقتي التقسيم** (multi-way و binary)، فلا توجد طريقة هي الأفضل دائماً.",
          ],
        },
      ],
    },
    {
      title: "التقسيم بناءً على السمات المستمرة",
      en: "Splitting Based on Continuous Attributes",
      blocks: [
        {
          type: "p",
          text: "**١. التحويل إلى فئات ترتيبية `Discretization`**: نجد النطاقات بالتجزئة **بالفاصل المتساوي** `equal interval`، أو **بالتردد المتساوي** (النسب المئوية) `equal frequency`، أو **بالتجميع** `clustering`. والتجزئة إما **ثابتة `Static`** (مرة واحدة في البداية) أو **ديناميكية `Dynamic`** (تتكرر عند كل عقدة).",
        },
        {
          type: "p",
          text: "**٢. القرار الثنائي `Binary Decision`**: `(A < v)` أو `(A ≥ v)`. انتبه: **المساواة في أحد الطرفين فقط** وليس كليهما. ننظر في **كل الانقسامات الممكنة** ونجد أفضل قطع (الاختيار مدروس وليس عشوائياً)، وهذا **أكثر استهلاكاً** للموارد الحاسوبية.",
        },
      ],
    },
    {
      title: "كيف نحدد أفضل تقسيم؟ مفهوم عدم النقاء",
      en: "How to Determine the Best Split",
      blocks: [
        {
          type: "p",
          text: "**النهج الجشع `Greedy approach`**: نفضّل العقد ذات **توزيع فئات أنقى**، **دون التفكير** بنقاء العقد التي ستأتي من سلالتها لاحقاً.",
        },
        {
          type: "p",
          text: "نحتاج **مقياساً لعدم نقاء العقدة `Node Impurity`** (الشوائب، عكس النقاء). عقدة فيها `C0: 5, C1: 5` **عالية الشوائب**، وعقدة فيها `C0: 9, C1: 1` **منخفضة الشوائب**. الهدف الوصول إلى صفر في أحد الصنفين (عقدة نقية).",
        },
        {
          type: "formula",
          lines: [
            "Gini Index  = 1 − Σᵢ pᵢ(t)²",
            "Entropy     = − Σᵢ pᵢ(t) · log₂ pᵢ(t)",
            "Class. Error = 1 − max[ pᵢ(t) ]",
          ],
        },
        {
          type: "p",
          text: "`pᵢ(t)` هو تكرار (نسبة) الصنف `i` عند العقدة `t`، و `c` عدد الأصناف. **كل هذه المقاييس تعتمد على مبدأ الاحتمالات**. في الإنتروبية المجموع سالب (لأن لوغاريتم الاحتمال سالب) لذلك ضُرب بإشارة سالبة.",
        },
      ],
    },
    {
      title: "إيجاد أفضل تقسيم بثلاث خطوات",
      en: "Finding the Best Split",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "احسب مقياس الشوائب **`P` قبل التقسيم** (للعقدة الأم).",
            "احسب مقياس الشوائب **`M` بعد التقسيم**: نحسب الشوائب لكل عقدة ابن، و `M` هو **المتوسط الموزون** لها.",
            "اختر شرط الاختبار الذي يعطي **أعلى مكسب** `Gain = P − M`، أو بشكل مكافئ **أدنى `M`**.",
          ],
        },
        { type: "formula", lines: ["Gain = P − M"] },
      ],
    },
    {
      title: "مؤشر جيني GINI",
      en: "Measure of Impurity: GINI",
      blocks: [
        { type: "formula", lines: ["GINI(t) = 1 − Σᵢ pᵢ(t)²"] },
        {
          type: "list",
          items: [
            "**الحد الأقصى `1 − 1/c`**: عندما تتوزع السجلات **بالتساوي** على كل الفئات ← أقل حالة فائدة للتصنيف. (لصنفين: 0.5)",
            "**الحد الأدنى `0`**: عندما تنتمي كل السجلات **لفئة واحدة** ← أكثر حالة فائدة.",
            "يُستخدم في خوارزميات `CART` و `SLIQ` و `SPRINT`.",
          ],
        },
        {
          type: "p",
          text: "**جيني لمجموعة عقد**: عندما تُقسَم العقدة `p` إلى `k` أبناء، `nᵢ` عدد سجلات الابن `i` و `n` عدد سجلات الأم:",
        },
        { type: "formula", lines: ["GINI_split = Σᵢ₌₁ᵏ (nᵢ / n) · GINI(i)"] },
        {
          type: "list",
          items: [
            "**السمات الثنائية**: انقسام إلى قسمين، ونسعى للأقسام **الأكبر والأنقى** (تأثير الوزن).",
            "**السمات الفئوية**: لكل قيمة نجمع العد لكل فئة، ونستخدم **مصفوفة العد `count matrix`** لاتخاذ القرار.",
            "**التقسيم الأفضل هو صاحب `Gini` الأقل**.",
          ],
        },
      ],
    },
    {
      title: "جيني للسمات المستمرة",
      en: "Continuous Attributes: Computing Gini",
      blocks: [
        {
          type: "p",
          text: "نستخدم **قرارات ثنائية** على قيمة واحدة `v`: `A ≤ v` و `A > v`. عدد قيم التقسيم الممكنة = **عدد القيم المختلفة**، وكل قيمة تقسيم لها **مصفوفة عد** خاصة بها.",
        },
        {
          type: "p",
          text: "اختيار `v` ليس عشوائياً: نجرب **كل الخيارات** ونحسب عدم النقاء لكل منها. **لتخفيف الحسابات**: نرتب قيم السمة **تصاعدياً**، ونحدّث مصفوفة العد تدريجياً عند كل موقع، ونحسب `gini` ثم نختار موقع الانقسام صاحب **أقل `gini`**.",
        },
      ],
    },
    {
      title: "الإنتروبية Entropy",
      en: "Measure of Impurity: Entropy",
      blocks: [
        { type: "formula", lines: ["Entropy(t) = − Σᵢ pᵢ(t) · log₂ pᵢ(t)"] },
        {
          type: "list",
          items: [
            "**الحد الأقصى `log₂ c`**: عند التوزع المتساوي ← أقل حالة مفيدة. (لصنفين: 1)",
            "**الحد الأدنى `0`**: كل السجلات من فئة واحدة ← أكثر حالة مفيدة.",
            "حسابات الإنتروبية **تشبه إلى حد كبير** حسابات `GINI`.",
          ],
        },
        {
          type: "example",
          text: "صنفان `c = 2` بعدد متساوٍ: `Entropy = −(½ log₂ ½ + ½ log₂ ½) = −log₂ ½ = log₂ 2 = 1` ← **أسوأ حالة**. وعندما تنتمي كل السجلات لصنف واحد: `Entropy = −(0 · log₂ 0 + 1 · log₂ 1) = 0` ← **أفضل حالة** (نعتبر `0 · log 0 = 0`).",
        },
      ],
    },
    {
      title: "مكسب المعلومات Information Gain",
      en: "Information Gain",
      blocks: [
        {
          type: "formula",
          lines: ["Gain_split = Entropy(p) − Σᵢ₌₁ᵏ (nᵢ / n) · Entropy(i)"],
        },
        {
          type: "list",
          items: [
            "العقدة الأم `p` تنقسم إلى `k` أبناء، و `nᵢ` عدد سجلات الابن `i`.",
            "نختار الانقسام الذي يحقق **أكبر نقصان** (`maximizes GAIN`).",
            "يُستخدم في `ID3` و `C4.5`.",
            "`Information gain` هو **المعلومات المشتركة** `mutual information` بين متغير الصنف والمتغير الذي نقسم عليه.",
          ],
        },
      ],
    },
    {
      title: "مشكلة كثرة الأقسام و Gain Ratio",
      en: "Problem with Large Number of Partitions",
      blocks: [
        {
          type: "p",
          text: "مقاييس عدم النقاء **تميل لتفضيل الانقسامات ذات عدد كبير من الأقسام**، كل منها صغير لكن نقي. المثال الأشهر: صفة **`ID`** (رقم فريد لكل سجل) تعطي **أكبر مكسب معلومات** لأن إنتروبية كل الفروع = صفر، رغم أنها **عديمة الفائدة** للتنبؤ.",
        },
        {
          type: "p",
          text: "**الحل `Gain Ratio`**: نقسم المكسب على `SplitINFO`، فالتقسيم ذو الإنتروبية العالية (عدد كبير من الأقسام الصغيرة) **يتعرض للعقوبة**.",
        },
        {
          type: "formula",
          lines: [
            "Gain Ratio = Gain_split / SplitINFO",
            "SplitINFO  = − Σᵢ₌₁ᵏ (nᵢ / n) · log₂(nᵢ / n)",
          ],
        },
        {
          type: "p",
          text: "يُستخدم في **`C4.5`**، وصُمم لتجاوز عيب `Information gain`.",
        },
      ],
    },
    {
      title: "خطأ التصنيف ومقارنة المقاييس",
      en: "Classification Error & Comparison",
      blocks: [
        { type: "formula", lines: ["Error(t) = 1 − maxᵢ pᵢ(t)"] },
        {
          type: "list",
          items: [
            "**الحد الأقصى `1 − 1/c`** عند التوزع المتساوي، **والأدنى `0`** عندما تنتمي كل السجلات لفئة واحدة.",
            "لمسألة بصنفين، المقاييس الثلاثة تصل للقيمة العظمى عند `p = 0.5` وللصفر عند `p = 0` أو `p = 1`، والترتيب: `Entropy ≥ Gini ≥ Error`.",
            "**`Misclassification Error` مقابل `Gini`**: قد **لا يتغير** خطأ التصنيف بعد التقسيم بينما **ينقص** جيني، أي أن جيني أكثر حساسية لتحسن النقاء (انظر الأمثلة الامتحانية).",
          ],
        },
      ],
    },
    {
      title: "مزايا وعيوب أشجار القرار",
      en: "Decision Tree Based Classification",
      blocks: [
        { type: "p", text: "**المزايا**:" },
        {
          type: "list",
          items: [
            "**رخيصة نسبياً** في الإنشاء.",
            "**سريعة جداً** في تصنيف السجلات غير المعروفة.",
            "**سهلة الفهم** للأشجار الصغيرة.",
            "**قوية ضد الضوضاء** (خاصة مع طرق تجنب الإفراط في التخصيص `overfitting`).",
            "تتعامل بسهولة مع **السمات الزائدة** `redundant`.",
            "تتعامل بسهولة مع **السمات غير ذات الصلة** (ما لم تتفاعل السمات).",
          ],
        },
        { type: "p", text: "**العيوب**:" },
        {
          type: "list",
          items: [
            "بسبب **الطبيعة الجشعة** لمعيار التقسيم، قد تُتجاهل **السمات المتفاعلة** (التي تميّز بين الفئات **معاً** لكن ليس كلٌّ على حدة) لصالح سمات أقل تمييزاً.",
            "**كل حد قرار يتضمن سمة واحدة فقط** (حدود موازية للمحاور).",
          ],
        },
      ],
    },
  ],
  laws: [
    {
      name: "Gini Index",
      formula: ["GINI(t) = 1 − Σᵢ pᵢ(t)²", "max = 1 − 1/c   ,   min = 0"],
      explain: "يُستخدم في CART و SLIQ و SPRINT. الأقل أفضل.",
      example: "(C1=1, C2=5): 1 − (1/6)² − (5/6)² = 0.278",
    },
    {
      name: "Gini للتقسيم",
      formula: ["GINI_split = Σᵢ (nᵢ / n) · GINI(i)"],
      explain: "متوسط موزون بعدد سجلات كل ابن.",
      example: "N1(5,1) N2(2,4): 6/12·0.278 + 6/12·0.444 = 0.361",
    },
    {
      name: "Entropy",
      formula: ["Entropy(t) = − Σᵢ pᵢ(t) · log₂ pᵢ(t)", "max = log₂ c   ,   min = 0"],
      explain: "لصنفين: القيمة العظمى 1 عند التوزع المتساوي. نعتبر 0·log0 = 0.",
      example: "(C1=1, C2=5): −(1/6)log₂(1/6) − (5/6)log₂(5/6) = 0.65",
    },
    {
      name: "Information Gain",
      formula: ["Gain = Entropy(p) − Σᵢ (nᵢ / n) · Entropy(i)"],
      explain: "نختار الأكبر. يُستخدم في ID3 و C4.5. عيبه: يفضّل الأقسام الكثيرة (ID).",
    },
    {
      name: "Gain Ratio",
      formula: [
        "GainRATIO = Gain_split / SplitINFO",
        "SplitINFO = − Σᵢ (nᵢ / n) · log₂(nᵢ / n)",
      ],
      explain: "يعاقب الانقسامات الكثيرة الصغيرة. يُستخدم في C4.5.",
      example: "ID بـ 20 قيمة: SplitINFO = log₂20 = 4.32",
    },
    {
      name: "Classification Error",
      formula: ["Error(t) = 1 − maxᵢ pᵢ(t)", "max = 1 − 1/c   ,   min = 0"],
      explain: "أقل حساسية من Gini و Entropy لتحسن النقاء.",
      example: "(C1=2, C2=4): 1 − 4/6 = 0.333",
    },
    {
      name: "أفضل تقسيم",
      formula: ["Gain = P − M"],
      explain: "P شوائب الأم، M الشوائب الموزونة للأبناء. أعلى Gain = أدنى M.",
    },
    {
      name: "لوغاريتمات مفيدة للامتحان",
      formula: [
        "log₂(1/2) = −1     log₂(1/4) = −2     log₂(1/8) = −3",
        "log₂(1/3) = −1.585  log₂(2/3) = −0.585",
        "log₂(1/5) = −2.322  log₂(4/5) = −0.322",
        "log₂ x = ln x / ln 2 = log₁₀ x / 0.301",
      ],
      explain: "احفظ هذه القيم أو قاعدة تحويل الأساس لتسريع الحساب بالآلة الحاسبة.",
    },
  ],
  shortcuts: [
    "x = features / input / independent. y = class / output / dependent / response.",
    "تدريب/اختبار **70% / 30%**. التدريب = **Induction**، التطبيق على الاختبار = **Deduction**.",
    "Ensemble = **Boosting, Bagging, Random Forests**.",
    "خوارزميات الأشجار: **Hunt** (الأقدم)، **CART**، **ID3/C4.5**، **SLIQ/SPRINT**.",
    "Hunt: كل السجلات نفس الفئة ← **ورقة**. وإلا ← **اختبار سمة** وتقسيم وتكرار.",
    "نتوقف: كل السجلات نفس الفئة، أو قيم سمات متطابقة، أو **Early termination**.",
    "Ordinal binary split يجب أن **يحافظ على الترتيب**: {S,M}|{L,XL} ✓ ، {S,L}|{M,XL} ✗.",
    "Continuous: `A < v` أو `A ≥ v` — **المساواة بطرف واحد فقط**. Discretization: static (مرة) أو dynamic (كل عقدة).",
    "Greedy = نختار الأنقى الآن **بدون النظر للمستقبل**.",
    "**الأقل** Gini/Entropy/Error = **الأفضل**. **الأكبر** Gain = **الأفضل**.",
    "الحدود: Gini و Error بين **0 و 1−1/c** ، Entropy بين **0 و log₂c**. لصنفين: Gini 0.5 ، Entropy 1 ، Error 0.5.",
    "Gini ← **CART, SLIQ, SPRINT**. Info Gain ← **ID3, C4.5**. Gain Ratio ← **C4.5**.",
    "صفة ID تعطي أعلى Info Gain (كل الأبناء نقية) ← الحل **Gain Ratio**.",
    "لصنفين: **Entropy ≥ Gini ≥ Error**، وكلها عظمى عند p = 0.5.",
    "Error قد **لا يتغير** بعد تقسيم مفيد، بينما Gini **ينقص**.",
    "عيوب الأشجار: **جشعة** (تتجاهل السمات المتفاعلة) + كل حد قرار = **سمة واحدة**.",
  ],
  mcq: [
    {
      q: "في سجل التدريب (x, y) يمثل y:",
      options: ["مجموعة السمات", "تصنيف الفئة", "رقم السجل", "وزن السجل"],
      answer: 1,
      why: "y = class / response / dependent variable / output.",
    },
    {
      q: "أي مما يلي ليس تسمية لـ x؟",
      options: ["feature", "input", "independent variable", "response"],
      answer: 3,
      why: "response تسمية لـ y.",
    },
    {
      q: "النسبة الشائعة لتقسيم البيانات بين التدريب والاختبار:",
      options: ["50% / 50%", "70% / 30%", "90% / 10%", "30% / 70%"],
      answer: 1,
      why: "70% تدريب و 30% اختبار (أو نسب أخرى).",
    },
    {
      q: "أي مما يلي من المصنّفات التجميعية Ensemble؟",
      options: ["Naïve Bayes", "Random Forests", "SVM", "Nearest-neighbor"],
      answer: 1,
      why: "Ensemble: Boosting, Bagging, Random Forests.",
    },
    {
      q: "من أقدم خوارزميات بناء أشجار القرار:",
      options: ["C4.5", "SPRINT", "Hunt's Algorithm", "CART"],
      answer: 2,
      why: "Hunt's Algorithm (one of the earliest).",
    },
    {
      q: "في خوارزمية Hunt، إذا كانت كل سجلات Dt من نفس الفئة yt فإن:",
      options: [
        "نقسم العقدة إلى قسمين",
        "العقدة t ورقة موسومة بـ yt",
        "نحذف العقدة",
        "نختار سمة عشوائية",
      ],
      answer: 1,
      why: "وإذا كانت من أكثر من فئة نستخدم اختبار سمة ونكرر.",
    },
    {
      q: "تقسيم ثنائي غير صالح للصفة الترتيبية Size = {Small, Medium, Large}:",
      options: [
        "{Small} | {Medium, Large}",
        "{Small, Medium} | {Large}",
        "{Small, Large} | {Medium}",
        "كل ما سبق صالح",
      ],
      answer: 2,
      why: "يكسر خاصية الترتيب بين القيم.",
    },
    {
      q: "التجزئة الديناميكية Dynamic للسمات المستمرة تعني:",
      options: [
        "التحويل مرة واحدة في البداية",
        "تكرار التجزئة عند كل عقدة",
        "عدم التجزئة",
        "التجزئة العشوائية",
      ],
      answer: 1,
      why: "Static = مرة واحدة، Dynamic = عند كل عقدة.",
    },
    {
      q: "في القرار الثنائي للسمة المستمرة، الصيغة الصحيحة:",
      options: ["A ≤ v و A ≥ v", "A < v و A ≥ v", "A < v و A > v", "A = v فقط"],
      answer: 1,
      why: "المساواة بأحد الطرفين فقط وليس كليهما.",
    },
    {
      q: "النهج الجشع Greedy في اختيار التقسيم:",
      options: [
        "يأخذ بالحسبان نقاء العقد المستقبلية",
        "يفضّل الأنقى حالياً دون التفكير بالعقد القادمة",
        "يختار عشوائياً",
        "يجرب كل الأشجار الممكنة",
      ],
      answer: 1,
      why: "ولهذا قد يتجاهل السمات المتفاعلة.",
    },
    {
      q: "عقدة فيها C0 = 5 و C1 = 5 هي:",
      options: ["نقية تماماً", "عالية الشوائب", "منخفضة الشوائب", "ورقة"],
      answer: 1,
      why: "التوزع المتساوي = أسوأ حالة.",
    },
    {
      q: "قيمة Gini لعقدة فيها C1 = 3 و C2 = 3:",
      options: ["0", "0.5", "1", "0.278"],
      answer: 1,
      why: "1 − (0.5² + 0.5²) = 0.5 = 1 − 1/c.",
    },
    {
      q: "قيمة Gini لعقدة فيها C1 = 0 و C2 = 6:",
      options: ["0", "0.5", "1", "0.167"],
      answer: 0,
      why: "عقدة نقية ⇒ 1 − (0² + 1²) = 0.",
    },
    {
      q: "قيمة Gini لعقدة فيها C1 = 2 و C2 = 4:",
      options: ["0.278", "0.333", "0.444", "0.5"],
      answer: 2,
      why: "1 − (2/6)² − (4/6)² = 1 − 4/36 − 16/36 = 16/36 = 0.444.",
    },
    {
      q: "الحد الأقصى للإنتروبية لمسألة فيها 4 أصناف:",
      options: ["1", "2", "0.75", "4"],
      answer: 1,
      why: "log₂ c = log₂ 4 = 2.",
    },
    {
      q: "الحد الأقصى لـ Gini لمسألة فيها 4 أصناف:",
      options: ["0.5", "0.75", "1", "2"],
      answer: 1,
      why: "1 − 1/c = 1 − 1/4 = 0.75.",
    },
    {
      q: "Classification Error لعقدة فيها C1 = 1 و C2 = 5:",
      options: ["1/6", "5/6", "0.278", "0.65"],
      answer: 0,
      why: "1 − max(1/6, 5/6) = 1/6 ≈ 0.167.",
    },
    {
      q: "مؤشر Gini يُستخدم في خوارزميات:",
      options: ["ID3 و C4.5", "CART و SLIQ و SPRINT", "Hunt فقط", "K-means"],
      answer: 1,
      why: "Information Gain في ID3 و C4.5.",
    },
    {
      q: "عند المقارنة بين تقسيمين بمؤشر Gini نختار:",
      options: ["Gini الأكبر", "Gini الأقل", "أي منهما", "الذي له أقسام أكثر"],
      answer: 1,
      why: "التقسيم الأفضل هو Gini الأقل (أو Gain الأكبر).",
    },
    {
      q: "لماذا تعطي صفة ID أعلى Information Gain؟",
      options: [
        "لأنها أهم صفة",
        "لأن كل فرع فيه سجل واحد فإنتروبيته صفر",
        "لأنها عددية",
        "لأنها ترتيبية",
      ],
      answer: 1,
      why: "أقسام كثيرة صغيرة ونقية، والحل Gain Ratio.",
    },
    {
      q: "Gain Ratio يُستخدم في خوارزمية:",
      options: ["CART", "ID3", "C4.5", "SPRINT"],
      answer: 2,
      why: "صُمم لتجاوز عيب Information Gain.",
    },
    {
      q: "SplitINFO لتقسيم 16 سجلاً إلى 4 أبناء متساوية (4 سجلات لكل ابن):",
      options: ["1", "2", "4", "0.5"],
      answer: 1,
      why: "−4 × (1/4) log₂(1/4) = log₂ 4 = 2.",
    },
    {
      q: "لمسألة بصنفين، الترتيب الصحيح للمقاييس عند نفس التوزيع:",
      options: [
        "Error ≥ Gini ≥ Entropy",
        "Entropy ≥ Gini ≥ Error",
        "Gini ≥ Entropy ≥ Error",
        "كلها متساوية",
      ],
      answer: 1,
      why: "مثلاً عند p = 0.5: Entropy = 1، Gini = 0.5، Error = 0.5.",
    },
    {
      q: "من عيوب أشجار القرار:",
      options: [
        "بطيئة في تصنيف السجلات الجديدة",
        "صعبة الفهم دائماً",
        "كل حد قرار يتضمن سمة واحدة فقط",
        "لا تتحمل الضوضاء",
      ],
      answer: 2,
      why: "بالإضافة لتجاهل السمات المتفاعلة بسبب الطبيعة الجشعة.",
    },
  ],
  exercises: [
    {
      title: "مثال 1: Gini و Entropy و Error لعقدة واحدة",
      problem: [
        {
          type: "p",
          text: "احسب المقاييس الثلاثة لكل من العقد التالية (صنفان C1 و C2، كل عقدة فيها 6 سجلات):",
        },
        {
          type: "table",
          ltr: true,
          head: ["Node", "C1", "C2"],
          rows: [
            ["N1", "0", "6"],
            ["N2", "1", "5"],
            ["N3", "2", "4"],
            ["N4", "3", "3"],
          ],
        },
      ],
      solution: [
        {
          type: "p",
          text: "نحسب الاحتمالات `p(C1)` و `p(C2)` ثم نطبق القوانين:",
        },
        {
          type: "formula",
          lines: [
            "N2: p = (1/6, 5/6)",
            "Gini    = 1 − (1/6)² − (5/6)² = 1 − 1/36 − 25/36 = 10/36 = 0.278",
            "Entropy = −(1/6)log₂(1/6) − (5/6)log₂(5/6) = 0.431 + 0.219 = 0.650",
            "Error   = 1 − max(1/6, 5/6) = 1/6 = 0.167",
          ],
        },
        {
          type: "formula",
          lines: [
            "N3: p = (2/6, 4/6) = (1/3, 2/3)",
            "Gini    = 1 − 4/36 − 16/36 = 16/36 = 0.444",
            "Entropy = −(1/3)log₂(1/3) − (2/3)log₂(2/3) = 0.528 + 0.390 = 0.918",
            "Error   = 1 − 4/6 = 0.333",
          ],
        },
        {
          type: "table",
          ltr: true,
          head: ["Node", "Gini", "Entropy", "Error"],
          rows: [
            ["N1 (0,6)", "0", "0", "0"],
            ["N2 (1,5)", "0.278", "0.650", "0.167"],
            ["N3 (2,4)", "0.444", "0.918", "0.333"],
            ["N4 (3,3)", "0.5", "1", "0.5"],
          ],
        },
        {
          type: "note",
          text: "كل المقاييس **صفر** للعقدة النقية و**عظمى** عند التوزع المتساوي، و `Entropy ≥ Gini ≥ Error` دائماً لصنفين.",
        },
      ],
      answer: "N1 = 0 للكل ، N4 = (0.5 ، 1 ، 0.5) ، N2 و N3 حسب الجدول",
    },
    {
      title: "مثال 2: Gini لتقسيم ثنائي و Gain",
      problem: [
        {
          type: "p",
          text: "عقدة أم فيها `C1 = 7` و `C2 = 5`. الصفة B تقسمها إلى ابنين: `N1 (C1 = 5, C2 = 1)` و `N2 (C1 = 2, C2 = 4)`. احسب `Gini` قبل وبعد التقسيم والمكسب.",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "P = Gini(parent) = 1 − (7/12)² − (5/12)² = 1 − 49/144 − 25/144 = 0.486",
            "Gini(N1) = 1 − (5/6)² − (1/6)² = 0.278",
            "Gini(N2) = 1 − (2/6)² − (4/6)² = 0.444",
            "M = (6/12)·0.278 + (6/12)·0.444 = 0.361",
            "Gain = P − M = 0.486 − 0.361 = 0.125",
          ],
        },
        {
          type: "note",
          text: "الوزن `nᵢ/n` مهم: لو كان أحد الأبناء أكبر لكان تأثيره على `M` أكبر.",
        },
      ],
      answer: "Gini قبل = 0.486 ، بعد = 0.361 ، Gain = 0.125",
    },
    {
      title: "مثال 3: سمة اسمية — Multi-way أم Binary؟",
      problem: [
        {
          type: "p",
          text: "الصفة `CarType` في 20 سجلاً. مصفوفة العد:",
        },
        {
          type: "table",
          ltr: true,
          head: ["", "Family", "Sports", "Luxury"],
          rows: [
            ["C1", "1", "8", "1"],
            ["C2", "3", "0", "7"],
          ],
        },
        {
          type: "p",
          text: "قارن بـ `Gini` بين: التقسيم المتعدد، و `{Sports, Luxury} | {Family}`، و `{Sports} | {Family, Luxury}`.",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "Multi-way:",
            "Gini(Family) = 1 − (1/4)² − (3/4)² = 0.375      n = 4",
            "Gini(Sports) = 1 − (8/8)² = 0                    n = 8",
            "Gini(Luxury) = 1 − (1/8)² − (7/8)² = 0.219      n = 8",
            "M = 4/20·0.375 + 8/20·0 + 8/20·0.219 = 0.163",
          ],
        },
        {
          type: "formula",
          lines: [
            "{Sports,Luxury} | {Family}:",
            "Gini(SL) = 1 − (9/16)² − (7/16)² = 0.492        n = 16",
            "M = 16/20·0.492 + 4/20·0.375 = 0.469",
          ],
        },
        {
          type: "formula",
          lines: [
            "{Sports} | {Family,Luxury}:",
            "Gini(FL) = 1 − (2/12)² − (10/12)² = 0.278       n = 12",
            "M = 8/20·0 + 12/20·0.278 = 0.167",
          ],
        },
        {
          type: "note",
          text: "الأقل `Gini` هو **Multi-way (0.163)** ثم `{Sports}|{Family,Luxury}` (0.167). لذلك **يجب تقييم الطريقتين** ولا توجد طريقة أفضل دائماً.",
        },
      ],
      answer: "Multi-way = 0.163 (الأفضل) ، {S,L}|{F} = 0.469 ، {S}|{F,L} = 0.167",
    },
    {
      title: "مثال 4: أفضل نقطة تقسيم لسمة مستمرة",
      problem: [
        {
          type: "p",
          text: "باستخدام جدول التدريب (10 سجلات)، الصفة المستمرة `Taxable Income` والصنف `Cheat`. بعد الترتيب التصاعدي:",
        },
        {
          type: "table",
          ltr: true,
          head: ["Income", "60", "70", "75", "85", "90", "95", "100", "120", "125", "220"],
          rows: [["Cheat", "No", "No", "No", "Yes", "Yes", "Yes", "No", "No", "No", "No"]],
        },
        {
          type: "p",
          text: "احسب `Gini` للتقسيم عند `v = 80` و `v = 97`. أيهما أفضل؟",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "v = 80:",
            "≤ 80 : {60,70,75}            → Yes=0 , No=3 → Gini = 0",
            "> 80 : {85,…,220} (7 rec.)   → Yes=3 , No=4 → Gini = 1 − (3/7)² − (4/7)² = 0.490",
            "M = 3/10·0 + 7/10·0.490 = 0.343",
          ],
        },
        {
          type: "formula",
          lines: [
            "v = 97:",
            "≤ 97 : {60,…,95} (6 rec.)    → Yes=3 , No=3 → Gini = 0.5",
            "> 97 : {100,120,125,220}     → Yes=0 , No=4 → Gini = 0",
            "M = 6/10·0.5 + 4/10·0 = 0.300",
          ],
        },
        {
          type: "p",
          text: "`v = 97` أفضل لأن `Gini` أقل. (لو جربنا كل النقاط بين القيم المرتبة لوجدنا أن **97 هي الأفضل** بقيمة 0.300.) لاحظ: الترتيب يسمح بتحديث مصفوفة العد بإضافة سجل واحد كل مرة بدلاً من إعادة العد.",
        },
      ],
      answer: "Gini(80) = 0.343 ، Gini(97) = 0.300 ⇒ أفضل تقسيم Income ≤ 97",
    },
    {
      title: "مثال 5: اختيار جذر الشجرة بـ Gini",
      problem: [
        {
          type: "p",
          text: "من جدول التدريب (3 Yes و 7 No): احسب `Gini_split` للصفة `Refund` وللصفة `Marital Status` (تقسيم متعدد). أيهما يصلح جذراً أفضل؟",
        },
        { type: "table", ltr: true, head: TRAIN_HEAD, rows: TRAIN_ROWS },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "Gini(parent) = 1 − (3/10)² − (7/10)² = 0.42",
            "",
            "Refund:",
            "Yes {1,4,7}: Yes=0 , No=3 → 0",
            "No  {2,3,5,6,8,9,10}: Yes=3 , No=4 → 1 − 9/49 − 16/49 = 0.490",
            "M = 3/10·0 + 7/10·0.490 = 0.343",
          ],
        },
        {
          type: "formula",
          lines: [
            "Marital Status:",
            "Single   {1,3,8,10}: Yes=2 , No=2 → 0.5",
            "Married  {2,4,6,9} : Yes=0 , No=4 → 0",
            "Divorced {5,7}     : Yes=1 , No=1 → 0.5",
            "M = 4/10·0.5 + 4/10·0 + 2/10·0.5 = 0.300",
          ],
        },
        {
          type: "p",
          text: "`Marital Status` أفضل (0.300 < 0.343، أي `Gain` أكبر: 0.12 مقابل 0.077). وهذا يفسّر لماذا قد نحصل على **شجرة أخرى** جذرها `MarSt` لنفس البيانات.",
        },
      ],
      answer: "Refund = 0.343 ، Marital = 0.300 ⇒ Marital Status أفضل كجذر",
    },
    {
      title: "مثال 6: Information Gain للمقارنة بين صفتين",
      problem: [
        {
          type: "p",
          text: "عقدة أم فيها 10 سجلات (5 Yes و 5 No). الصفة A تقسمها إلى `(4Y, 1N)` و `(1Y, 4N)`، والصفة B إلى `(5Y, 3N)` و `(0Y, 2N)`. أي صفة نختار بحسب `Information Gain`؟",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "Entropy(parent) = −(½log₂½ + ½log₂½) = 1",
            "",
            "A: Entropy(4,1) = Entropy(1,4) = −(0.8·log₂0.8 + 0.2·log₂0.2)",
            "                = 0.258 + 0.464 = 0.722",
            "   M = 5/10·0.722 + 5/10·0.722 = 0.722 → Gain(A) = 1 − 0.722 = 0.278",
          ],
        },
        {
          type: "formula",
          lines: [
            "B: Entropy(5,3) = −(5/8·log₂(5/8) + 3/8·log₂(3/8)) = 0.424 + 0.531 = 0.954",
            "   Entropy(0,2) = 0",
            "   M = 8/10·0.954 + 2/10·0 = 0.763 → Gain(B) = 1 − 0.763 = 0.237",
          ],
        },
        {
          type: "note",
          text: "رغم أن B أعطت ابناً **نقياً تماماً**، فإن A أفضل لأن ابنَي B الآخر كبير وغير نقي. **الوزن `nᵢ/n` يصنع الفرق**.",
        },
      ],
      answer: "Gain(A) = 0.278 > Gain(B) = 0.237 ⇒ نختار A",
    },
    {
      title: "مثال 7: Gain Ratio يعاقب صفة ID",
      problem: [
        {
          type: "p",
          text: "مجموعة 20 سجلاً (10 Yes و 10 No). الصفة A تقسمها إلى `(8Y, 2N)` و `(2Y, 8N)`. الصفة `ID` تعطي 20 ابناً، كل ابن فيه سجل واحد. قارن بـ `Information Gain` ثم بـ `Gain Ratio`.",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "Entropy(parent) = 1",
            "",
            "A : M = 0.722  → Gain = 0.278",
            "    SplitINFO = −(½log₂½ + ½log₂½) = 1",
            "    GainRatio = 0.278 / 1 = 0.278",
          ],
        },
        {
          type: "formula",
          lines: [
            "ID: every child is pure → M = 0 → Gain = 1",
            "    SplitINFO = −20 · (1/20)·log₂(1/20) = log₂ 20 = 4.32",
            "    GainRatio = 1 / 4.32 = 0.231",
          ],
        },
        {
          type: "p",
          text: "بحسب `Information Gain` تفوز `ID` (1 > 0.278) وهذا **خطأ** لأنها عديمة الفائدة للتنبؤ. بحسب `Gain Ratio` تفوز `A` (0.278 > 0.231) لأن `SplitINFO` الكبير **عاقب** الانقسام إلى أقسام كثيرة.",
        },
      ],
      answer: "Gain: ID = 1 > A = 0.278 ، لكن GainRatio: A = 0.278 > ID = 0.231 ⇒ نختار A",
    },
    {
      title: "مثال 8: Misclassification Error مقابل Gini",
      problem: [
        {
          type: "p",
          text: "عقدة أم `(C1 = 7, C2 = 3)` تنقسم إلى `N1 (C1 = 3, C2 = 0)` و `N2 (C1 = 4, C2 = 3)`. احسب `Error` و `Gini` قبل وبعد. ماذا تلاحظ؟",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "Before:  Error = 1 − 7/10 = 0.3      Gini = 1 − 0.49 − 0.09 = 0.42",
            "",
            "N1 (3,0): Error = 0                  Gini = 0",
            "N2 (4,3): Error = 1 − 4/7 = 0.429    Gini = 1 − 16/49 − 9/49 = 0.490",
            "",
            "After:   Error = 3/10·0 + 7/10·0.429 = 0.3",
            "         Gini  = 3/10·0 + 7/10·0.490 = 0.343",
          ],
        },
        {
          type: "note",
          text: "خطأ التصنيف **لم يتغير** (0.3 ← 0.3) رغم أن التقسيم أنتج عقدة نقية، بينما `Gini` **نقص** (0.42 ← 0.343). أي أن `Gini` أكثر حساسية لتحسن النقاء.",
        },
      ],
      answer: "Error: 0.3 ← 0.3 (بدون تحسن) ، Gini: 0.42 ← 0.343 (تحسن)",
    },
    {
      title: "مثال 9: تطبيق الشجرة على سجل اختبار",
      problem: [
        {
          type: "p",
          text: "باستخدام شجرة المحاضرة (`Refund` ← `MarSt` ← `TaxInc`)، صنّف السجلات التالية:",
        },
        {
          type: "table",
          ltr: true,
          head: ["#", "Refund", "Marital Status", "Taxable Income"],
          rows: [
            ["T1", "No", "Married", "80K"],
            ["T2", "No", "Single", "95K"],
            ["T3", "Yes", "Divorced", "200K"],
            ["T4", "No", "Divorced", "60K"],
          ],
        },
      ],
      solution: [
        {
          type: "list",
          items: [
            "`T1`: Refund = No ← MarSt = Married ← **NO**.",
            "`T2`: Refund = No ← MarSt = Single ← TaxInc = 95K > 80K ← **YES**.",
            "`T3`: Refund = Yes ← **NO** مباشرة (باقي الصفات لا تُفحص).",
            "`T4`: Refund = No ← MarSt = Divorced ← TaxInc = 60K < 80K ← **NO**.",
          ],
        },
        {
          type: "note",
          text: "نبدأ دائماً من **الجذر** ونتبع الفرع المطابق حتى نصل لورقة. السجل `T1` هو مثال المحاضرة ونتيجته `Cheat = No`.",
        },
      ],
      answer: "T1 = No ، T2 = Yes ، T3 = No ، T4 = No",
    },
  ],
};
