import type { Lecture } from "./types";

const WEATHER_HEAD = ["#", "Outlook", "Temp", "Humidity", "Windy", "Play"];
const WEATHER_ROWS = [
  ["1", "sunny", "hot", "high", "false", "no"],
  ["2", "sunny", "hot", "high", "true", "no"],
  ["3", "overcast", "hot", "high", "false", "yes"],
  ["4", "rainy", "mild", "high", "false", "yes"],
  ["5", "rainy", "cool", "normal", "false", "yes"],
  ["6", "rainy", "cool", "normal", "true", "no"],
  ["7", "overcast", "cool", "normal", "true", "yes"],
  ["8", "sunny", "mild", "high", "false", "no"],
  ["9", "sunny", "cool", "normal", "false", "yes"],
  ["10", "rainy", "mild", "normal", "false", "yes"],
  ["11", "sunny", "mild", "normal", "true", "yes"],
  ["12", "overcast", "mild", "high", "true", "yes"],
  ["13", "overcast", "hot", "normal", "false", "yes"],
  ["14", "rainy", "mild", "high", "true", "no"],
];

const BUYS_HEAD = ["#", "age", "income", "student", "credit_rating", "buys_computer"];
const BUYS_ROWS = [
  ["1", "<=30", "high", "no", "fair", "no"],
  ["2", "<=30", "high", "no", "excellent", "no"],
  ["3", "31…40", "high", "no", "fair", "yes"],
  ["4", ">40", "medium", "no", "fair", "yes"],
  ["5", ">40", "low", "yes", "fair", "yes"],
  ["6", ">40", "low", "yes", "excellent", "no"],
  ["7", "31…40", "low", "yes", "excellent", "yes"],
  ["8", "<=30", "medium", "no", "fair", "no"],
  ["9", "<=30", "low", "yes", "fair", "yes"],
  ["10", ">40", "medium", "yes", "fair", "yes"],
  ["11", "<=30", "medium", "yes", "excellent", "yes"],
  ["12", "31…40", "medium", "no", "excellent", "yes"],
  ["13", "31…40", "high", "yes", "fair", "yes"],
  ["14", ">40", "medium", "no", "excellent", "no"],
];

export const lecture06: Lecture = {
  n: 6,
  title: "التصنيف: OneR و Naïve Bayes و ID3",
  en: "Classification: 1R, Naïve Bayes & Information Gain",
  summary:
    "التصنيف كعملية من مرحلتين ودقة النموذج، التعلم بإشراف وبدون إشراف، تجهيز البيانات ومعايير تقييم الخوارزميات، ثم ثلاث خوارزميات: 1R بقاعدة واحدة، Naïve Bayes الاحتمالية، و ID3 المعتمدة على Information Gain.",
  ideas: [
    {
      title: "ما هو التصنيف؟",
      en: "Classification",
      blocks: [
        {
          type: "p",
          text: "التصنيف **يتنبأ بعمود القرار** (التسميات التصنيفية `class labels`). وليس شرطاً أن يكون له حالتان فقط (`Yes/No`)، فقد يكون عدد نجوم فندق أو حالة طقس. نقوم بتسمية السجل اعتماداً على الأصناف الموجودة.",
        },
        {
          type: "p",
          text: "تصنيف البيانات يقوم على **بناء نموذج** يعتمد على مجموعتين: **التدريب** لبناء النموذج، و**الاختبار** للتحقق من دقته. ثم نستخدم النموذج للتنبؤ بواصفة القرار لحالات **جديدة غير موجودة** في قاعدة البيانات.",
        },
        { type: "p", text: "**تطبيقات نموذجية `Typical Applications`**:" },
        {
          type: "list",
          items: [
            "`Credit approval`: شخص يريد بطاقة ائتمان أو حساباً بنكياً، نأخذ صفاته ونقارنها بزبائن سابقين ثم نقرر.",
            "`Target marketing` التسويق المستهدف: تقديم تسهيلات لمن يُتوقع أن يشتري، أو الحملات البريدية حسب خصائص الأشخاص.",
            "`Medical diagnosis` التشخيص الطبي: من الأعراض نعرف هل الشخص مصاب بمرض معين.",
            "`Treatment effectiveness analysis` تحليل فعالية المعالجة.",
          ],
        },
      ],
    },
    {
      title: "التصنيف عملية من مرحلتين ومعدل الدقة",
      en: "Classification — A Two-Step Process",
      blocks: [
        {
          type: "p",
          text: "**١. بناء النموذج `Model construction`**: يمكن تمثيل النموذج بأشكال مختلفة: **شجرة**، أو **صيغة رياضية**، أو **قواعد تصنيف**.",
        },
        {
          type: "p",
          text: "**٢. استخدام النموذج `Model usage`**: للتنبؤ بحالات جديدة. لكن قبل اعتماده **يجب التحقق من دقته** عبر **معدل الدقة**: نقسم البيانات إلى `training` و `testing`، وفي الـ `testing` نعرف الـ `class label` الحقيقي لكل سجل، فنمرر السجل على النموذج ونقارن النتيجة بالأصلية.",
        },
        {
          type: "formula",
          lines: ["Accuracy = correctly classified test records / total test records"],
        },
        {
          type: "p",
          text: "**يجب أن يكون `test set` مستقلاً عن `training set`**، وإلا نحصل على تناسب زائد **`Overfitting`**. مثال: تدريب طفل على كتابة كلمة ثم اختباره بنفس الكلمة مباشرة، فالنجاح هنا لا يعني أنه تعلّم.",
        },
      ],
    },
    {
      title: "مثال الأساتذة الدائمين (Tenured)",
      en: "Model Construction & Usage Example",
      blocks: [
        {
          type: "p",
          text: "بيانات تدريب: اسم الشخص، مرتبته العلمية (أستاذ، أستاذ مساعد، أستاذ مشارك)، عدد سنوات الخبرة، وهل هو **دائم** `tenured` أم مؤقت (عمود التصنيف).",
        },
        {
          type: "p",
          text: "خوارزمية التصنيف أعطت النموذج: `IF rank = 'professor' OR years > 6 THEN tenured = 'yes'`.",
        },
        {
          type: "p",
          text: "طبّقناه على 4 سجلات اختبار (الاسم لا يهم): الأول صحيح (`no`)، **الثاني خاطئ** حسب القواعد، الثالث والرابع صحيحان ← **الدقة = 3/4 = 75%** وتعتبر جيدة. (الحل التفصيلي في الأمثلة الامتحانية.)",
        },
      ],
    },
    {
      title: "التعلم بإشراف وبدون إشراف",
      en: "Supervised vs Unsupervised Learning",
      blocks: [
        {
          type: "p",
          text: "**التعلم بإشراف `Supervised`**: مثل طفل أخبرناه أن هذه كرات وما هي ألوانها. توجد **تسميات `labels`** لكل مشاهدة وكل سجل (بيانات مصنّفة)، فنصنّف البيانات الجديدة بنموذج مبني من `training set`. مثاله: **`Classification`**.",
        },
        {
          type: "p",
          text: "**التعلم بدون إشراف `Unsupervised`**: طلبنا من الطفل أن يضع الكرات ذات اللون الواحد في مجموعة **دون إخباره بأسماء الألوان**، ثم أطلقنا التسمية بعد التجميع. **لا نعرف التصنيفات مسبقاً**، نعطي معايير وملاحظات فتُجمع البيانات في مجموعات وكل مجموعة تأخذ تصنيفاً. مثاله: **`Clustering`**.",
        },
      ],
    },
    {
      title: "تجهيز البيانات قبل التصنيف",
      en: "Data Preparation",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**`Data Cleaning`**: معالجة البيانات لتقليل الضوضاء والتعامل مع القيم المفقودة.",
            "**`Relevance analysis`** تحليل الصلة: نحافظ على الواصفات المرتبطة بالظاهرة المدروسة ونحذف غير المرتبطة، ويُعرف بـ **`Feature Selection`**.",
            "**`Data transformation`**: توحيد المقياس `Scale` (مثلاً أرقام العمر مقارنة بأرقام الرواتب، وإلا يتضاءل تأثير العمر)، عبر `Generalize and/or normalize data`.",
          ],
        },
        {
          type: "note",
          text: "لا توجد خوارزمية تصنيف أفضل من غيرها بشكل مطلق. **البيانات هي التي تحدد الأفضل**: نجرب عدة خوارزميات على نفس البيانات ونعتمد صاحبة الدقة الأعلى.",
        },
      ],
    },
    {
      title: "معايير تقييم خوارزميات التصنيف",
      en: "Evaluating Classification Methods",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**دقة التصنيف `Accuracy`**: **أهم معيار**، وعند تساوي الدقة ننتقل للمعايير الأخرى.",
            "**السرعة `Speed`**: سرعة بناء النموذج وسرعة استخدامه.",
            "**المتانة `Robustness`**: هل تعالج الضجيج والقيم المفقودة؟ (بعض الخوارزميات تحتاج `Pre-processing` لذلك).",
            "**قابلية التوسع `Scalability`**: هل تتعامل مع بيانات أكبر من الذاكرة (على الـ `disk`)؟",
            "**قابلية التفسير `Interpretability`**: هل النموذج مفهوم؟",
            "**جودة القواعد `Goodness of rules`**: شجرة أصغر وقواعد أقل = أفضل.",
          ],
        },
      ],
    },
    {
      title: "البنى البسيطة وخوارزمية 1R",
      en: "Simplicity First — 1R",
      blocks: [
        {
          type: "p",
          text: "خوارزميات بسيطة كثيراً ما تعمل بشكل جيد. أنواع البنى البسيطة:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**`1R`**: **صفة واحدة** فقط تتحكم بالتصنيف.",
            "كل الصفات **لها نفس الأهمية ومستقلة** عن بعضها (وهذه فكرة `Naïve Bayes`).",
            "تركيب **خطي** موزون بين الصفات.",
            "`Use a few prototypes` (عدد قليل من النماذج الأولية).",
            "`Use simple logical rules` (قواعد منطقية بسيطة).",
          ],
        },
      ],
    },
    {
      title: "كيف تعمل 1R",
      en: "Inferring Rudimentary Rules",
      blocks: [
        {
          type: "p",
          text: "`1R` هي **شجرة قرار من مستوى واحد**: جذر وأوراق، وصفة **واحدة** مدروسة. **لكل قيمة** من قيم الصفة فرع، وقرار الفرع هو **الصنف الأكثر تكراراً** (الأغلبية) لهذه القيمة.",
        },
        {
          type: "p",
          text: "نهتم بحساب **نسبة الخطأ `error rate`**: نسبة الحالات التي **لا تنتمي لصنف الأغلبية**. نفعل ذلك لكل صفة، و**نختار الصفة ذات أقل خطأ كلي**.",
        },
        {
          type: "formula",
          lines: [
            "For each attribute:",
            "  For each value of the attribute:",
            "    count how often each class appears",
            "    rule: value → most frequent class",
            "  error rate of the attribute's rules",
            "Choose the attribute with the smallest error rate",
          ],
        },
        {
          type: "list",
          items: [
            "تفترض أن الصفات **اسمية ومتقطعة**، والمستمرة **نقطّعها**.",
            "عند **تعادل** عدد `Yes` و `No` نضع إشارة **`*`** للدلالة على التعادل.",
            "**الخطأ الكلي `Total error`** = مجموع البسوط ÷ مجموع المقامات.",
            "**القيم المفقودة**: نعاملها كقيمة جديدة اسمها `null` وندرس تصنيفها، ولهذا تعتبر الخوارزمية **متينة**.",
            "نجاح الطريقة يعتمد على **مجال المشكلة `domain`**.",
          ],
        },
      ],
    },
    {
      title: "مثال 1R على بيانات الطقس",
      en: "1R on the Weather Data",
      blocks: [
        {
          type: "p",
          text: "4 صفات: `Outlook` و `Temperature` و `Humidity` و `Windy`، والقرار `Play`. لكل صفة نبني قاعدة لكل قيمة: مثلاً `Outlook` لها 3 قيم: `Sunny` الأغلبية فيها `No`، و `Overcast` كلها `Yes`، وهكذا.",
        },
        {
          type: "table",
          ltr: true,
          head: ["Attribute", "Rules", "Errors", "Total"],
          rows: [
            ["Outlook", "sunny→no , overcast→yes , rainy→yes", "2/5 , 0/4 , 2/5", "4/14"],
            ["Temp", "hot→no* , mild→yes , cool→yes", "2/4 , 2/6 , 1/4", "5/14"],
            ["Humidity", "high→no , normal→yes", "3/7 , 1/7", "4/14"],
            ["Windy", "false→yes , true→no*", "2/8 , 3/6", "5/14"],
          ],
        },
        {
          type: "p",
          text: "أقل خطأ كلي `4/14` لـ **`Outlook`** و **`Humidity`** (تعادل)، فنعتمد إحداهما. وعند قدوم سجل جديد نقرر اعتماداً على قاعدة الصفة المختارة فقط.",
        },
      ],
    },
    {
      title: "النمذجة البايزية (الإحصائية)",
      en: "Statistical (Bayesian) Modeling",
      blocks: [
        {
          type: "p",
          text: "**عكس `1R`**: تستخدم **كل الصفات**، وتعتمد على **معادلات رياضية** (نموذج إحصائي/احتمالي). النموذج **ليس شجرة وليس مجموعات**.",
        },
        { type: "p", text: "لها افتراضان:" },
        {
          type: "list",
          items: [
            "**كل الواصفات بنفس الأهمية**.",
            "**الواصفات مستقلة إحصائياً** (لا ارتباط بينها). في الواقع يوجد ارتباط، ورغم أن الافتراض غير صحيح فالخوارزمية **عملياً تعمل جيداً** وتعطي دقة مناسبة.",
          ],
        },
      ],
    },
    {
      title: "نظرية بايز: الأساسيات",
      en: "Bayesian Theorem: Basics",
      blocks: [
        {
          type: "list",
          items: [
            "`X`: السجل (العينة) الذي نتنبأ بتصنيفه.",
            "`H`: فرضية أن `X` ينتمي إلى `class` معين.",
            "`P(H|X)`: احتمال الصنف `H` **علماً بأن** `X` وقع (احتمال شرطي) — **هذا ما نريد حسابه**.",
            "`P(H)`: احتمال الصنف (**المعرفة المسبقة** من السجلات)، مثل احتمال `Yes`.",
            "`P(X)`: احتمال العينة.",
            "`P(X|H)`: احتمال `X` علماً بأن الصنف `H` وقع.",
          ],
        },
        { type: "formula", lines: ["P(H|X) = P(X|H) · P(H) / P(X)"] },
        {
          type: "p",
          text: "الاشتقاق: الاحتمال الشرطي هو احتمال التقاطع على احتمال ما وقع: `P(H|X) = P(H ∩ X) / P(X) = P(X|H)·P(H) / P(X)`.",
        },
        {
          type: "p",
          text: "نحسب `P(Ci|X)` **لكل الأصناف**، و**الأعلى** هو تصنيف السجل. وبما أن `P(X)` موجب وثابت لكل الأصناف (القسمة على عدد موجب لا تغيّر جهة المتراجحة) **نحذفه ونكتفي بالبسط** `P(X|Ci)·P(Ci)`.",
        },
        {
          type: "example",
          text: "شخص معروف عمره وهل هو طالب، نريد معرفة هل سيشتري حاسباً. `X` سجله، و `H` إما `Yes` (يشتري) أو `No`.",
        },
      ],
    },
    {
      title: "مصنف Naïve Bayes وخطواته",
      en: "Naïve Bayes Classifier",
      blocks: [
        {
          type: "p",
          text: "`X = (X1, X2, …, Xn)` مجموعة صفات. **بسبب فرض الاستقلال يتحول التقاطع إلى جداء**، فندرس كل صفة على حدة (وهذا مبدأ الخوارزمية). لو لم يكن هناك استقلال لاحتجنا احتمال التقاطع.",
        },
        {
          type: "formula",
          lines: [
            "P(X|Ci) = Πₖ₌₁ⁿ P(Xk|Ci)",
            "P([X1, X2]|Ci) = P(X1|Ci) · P(X2|Ci)",
          ],
        },
        {
          type: "list",
          ordered: true,
          items: [
            "لكل صفة: نحسب `P(قيمة السجل | Yes)` و `P(قيمة السجل | No)` = عدد الحالات المطابقة ضمن الصنف ÷ عدد سجلات الصنف.",
            "نضرب الاحتمالات لكل صنف ← `P(X|Yes)` و `P(X|No)`.",
            "نضرب بالمعرفة المسبقة `P(Ci)`.",
            "نختار **القيمة الأعظم** ← هي القرار.",
          ],
        },
        {
          type: "note",
          text: "**لا ندرس كل قيم الجدول**، فقط القيم التي **تطابق العينة**. مثلاً إذا كانت العينة `age <= 30` لا داعي لدراسة باقي الأعمار.",
        },
      ],
    },
    {
      title: "مثال المحاضرة: هل سيشتري حاسباً؟",
      en: "Naïve Bayes Example — buys_computer",
      blocks: [
        {
          type: "p",
          text: "الصفات: `age` (مجال عمر)، `income` (`high/medium/low`)، `student` (`yes/no`)، `credit_rating` (`fair/excellent`)، والصنف `buys_computer`: `C1 = Yes` و `C2 = No`. لدينا 14 سجلاً: **9 Yes و 5 No**.",
        },
        {
          type: "p",
          text: "العينة: `age <= 30` ، `income = medium` ، `student = yes` ، `credit_rating = fair`.",
        },
        {
          type: "formula",
          lines: [
            "P(age<=30 | Yes) = 2/9 = 0.222      P(age<=30 | No) = 3/5 = 0.6",
            "P(medium  | Yes) = 4/9 = 0.444      P(medium  | No) = 2/5 = 0.4",
            "P(student | Yes) = 6/9 = 0.667      P(student | No) = 1/5 = 0.2",
            "P(fair    | Yes) = 6/9 = 0.667      P(fair    | No) = 2/5 = 0.4",
            "",
            "P(X|Yes) = 0.222 × 0.444 × 0.667 × 0.667 = 0.044",
            "P(X|No)  = 0.6 × 0.4 × 0.2 × 0.4       = 0.019",
            "",
            "P(X|Yes)·P(Yes) = 0.044 × 9/14 = 0.028",
            "P(X|No)·P(No)   = 0.019 × 5/14 = 0.007",
          ],
        },
        {
          type: "p",
          text: "`0.028 > 0.007` ← التصنيف **`buys_computer = Yes`**.",
        },
        {
          type: "note",
          text: "تصحيح في سلايد الجدول: السطر الثالث يجب أن يكون `31…40` بدلاً من `30`.",
        },
      ],
    },
    {
      title: "محاسن ومساوئ Naïve Bayes",
      en: "Naïve Bayes: Pros & Cons",
      blocks: [
        {
          type: "p",
          text: "**المحاسن**: سهلة التطبيق، وتعطي نتائج جيدة في معظم الحالات.",
        },
        {
          type: "p",
          text: "**المساوئ**: افتراض **الاستقلال** بين الواصفات يسبب فقدان دقة، لأن عملياً توجد **علاقات تبعية** بين المتغيرات. مثال المستشفيات: الملف الشخصي (العمر، التاريخ العائلي)، الأعراض (الحمى، السعال)، المرض (سرطان الرئة، السكري) — هذه مترابطة **ولا يمكن نمذجتها** بمصنف بايز البسيط.",
        },
        {
          type: "p",
          text: "**الحل**: **شبكات الاعتقاد البايزية `Bayesian Belief Networks`**.",
        },
      ],
    },
    {
      title: "خوارزمية ID3 و Information Gain",
      en: "Information Gain (ID3)",
      blocks: [
        {
          type: "p",
          text: "`ID3` تعتمد على الصفات **المتقطعة**، ونموذجها **شجرة**. أسلوبها **عودي**: نختار **واصفة الاختبار `Test attribute`** للعقدة، فتتوزع البيانات حسب فروعها، فنحصل على بيانات أصغر ونعيد تطبيق الخوارزمية عليها. وقرارها ليس بالضرورة `Yes/No` فقط.",
        },
        {
          type: "example",
          text: "في مثال الطقس إذا اخترنا `Outlook` كجذر: نحذف عمود `Outlook` ونأخذ سجلات `Sunny` (5) لوحدها، و `Overcast` (4)، و `Rainy` (5)، ونعيد تطبيق الخوارزمية على كل مجموعة أصغر.",
        },
        {
          type: "p",
          text: "لدينا `S` سجل، وعمود القرار فيه `m` صنفاً (`C1, C2, …, Cm`، ليس بالضرورة اثنين)، و `si` عدد سجلات الصنف `Ci`:",
        },
        {
          type: "formula",
          lines: [
            "I(s1, …, sm) = − Σᵢ (si/s) · log₂(si/s)",
            "E(A) = Σⱼ ( (s1j + … + smj) / s ) · I(s1j, …, smj)",
            "Gain(A) = I(s1, …, sm) − E(A)",
          ],
        },
        {
          type: "list",
          items: [
            "الصفة ذات **`Gain` الأعلى** (أي `E` الأقل) هي **جذر** الشجرة (أو العقدة الحالية)، لأنها **تقلل عدد الاحتمالات**.",
            "أقل قيمة للإنتروبية **0**. وإذا كان الصنفان **متساويين** فإن `I = 1`.",
            "عند تساوي قيم `Gain` نختار أياً منهما.",
            "`Gain` **لا يكون سالباً**، ولا يتجاوز `1` في مسألة بصنفين.",
            "العقد في **نفس المستوى** ليس شرطاً أن تكون نفس الصفة، لكن **الجذر** واحد.",
          ],
        },
      ],
    },
    {
      title: "شجرة buys_computer بـ ID3",
      en: "ID3 Tree for buys_computer",
      blocks: [
        {
          type: "formula",
          lines: [
            "Gain(age)           = 0.246   ← highest → root",
            "Gain(income)        = 0.029",
            "Gain(student)       = 0.151",
            "Gain(credit_rating) = 0.048",
          ],
        },
        {
          type: "p",
          text: "`age` هي الجذر. فرع `31…40` كل سجلاته `Yes` ← **قرار مباشر**. فرعا `<=30` و `>40` لم نصل فيهما لقرار، فنتابع على **5 سجلات** لكل منهما بعد حذف عمود `age`.",
        },
        {
          type: "formula",
          lines: [
            "age?",
            "├─ <=30   → student?        ├─ no → NO   └─ yes → YES",
            "├─ 31…40  → YES",
            "└─ >40    → credit_rating?  ├─ excellent → NO   └─ fair → YES",
          ],
        },
        {
          type: "p",
          text: "مثال سؤال: إذا كان العمر `31…40` نقرر مباشرة، وإذا كان `<=30` ننظر هل هو `student`، وإذا كان `>40` ننظر إلى `credit_rating` (إنتروبيته في هذا الفرع 0 لذلك هو الأفضل).",
        },
      ],
    },
    {
      title: "حالات خاصة في ID3",
      en: "Special Cases",
      blocks: [
        {
          type: "p",
          text: "إذا **لم يبقَ صفات** لندرسها ولم نصل لقرار في فرع ما، نأخذ **الأغلبية** مع ذكر **نسبة الخطأ**. مثال المحاضرة: فرع `income = low` قراره `Yes` بوضوح، وفرع `medium` غير محسوم ولم تبقَ صفات، فنقرر بالأغلبية مع نسبة خطأ. أما فرع فيه **تعادل** تام (مثل `high: 5/5`) فلا يمكن اتخاذ قرار.",
        },
        {
          type: "list",
          items: [
            "قد يأتي السؤال بالبيانات جاهزة ويطلب **تحديد الجذر** فقط أو الشجرة كاملة.",
            "**ليس بالضرورة أن تعطي كل الخوارزميات نفس التصنيف** (1R و Naïve Bayes و ID3 قد تختلف).",
            "ليس بالضرورة أن تكون العقد في نفس المستوى بنفس `test attribute`.",
            "مثال المحاضرة هو **نموذج متكامل لسؤال امتحان**.",
          ],
        },
      ],
    },
  ],
  laws: [
    {
      name: "معدل الدقة",
      formula: ["Accuracy = correct / total   (on an independent test set)"],
      explain: "إذا لم يكن test set مستقلاً عن training set نقع في Overfitting.",
      example: "3 صحيحة من 4 ⇒ 75%",
    },
    {
      name: "خطأ 1R",
      formula: [
        "error(value) = records NOT in majority class / records with this value",
        "Total error(attribute) = Σ numerators / Σ denominators",
      ],
      explain: "نختار الصفة ذات أقل Total error. التعادل يُعلَّم بـ *.",
      example: "Outlook: 2/5 + 0/4 + 2/5 ⇒ (2+0+2)/(5+4+5) = 4/14",
    },
    {
      name: "نظرية بايز",
      formula: ["P(H|X) = P(X|H) · P(H) / P(X)"],
      explain: "P(H) معرفة مسبقة، P(X|H) الاحتمال الشرطي للعينة. نحذف P(X) عند المقارنة.",
    },
    {
      name: "Naïve Bayes",
      formula: [
        "P(X|Ci) = Π P(Xk|Ci)",
        "Class = argmax  P(X|Ci) · P(Ci)",
      ],
      explain: "P(Xk|Ci) = عدد سجلات Ci التي فيها القيمة Xk ÷ عدد سجلات Ci.",
      example: "Yes: 0.044 × 9/14 = 0.028 ، No: 0.019 × 5/14 = 0.007 ⇒ Yes",
    },
    {
      name: "المعلومات المتوقعة I",
      formula: ["I(s1, …, sm) = − Σ (si/s) · log₂(si/s)"],
      explain: "= Entropy. صفر للعقدة النقية، و 1 لصنفين متساويين.",
      example: "I(9,5) = −(9/14)log₂(9/14) − (5/14)log₂(5/14) = 0.940",
    },
    {
      name: "الإنتروبية بعد التقسيم E(A)",
      formula: ["E(A) = Σⱼ (|Sj| / |S|) · I(Sj)"],
      explain: "متوسط موزون لإنتروبية فروع الصفة A.",
      example: "E(age) = 5/14·0.971 + 4/14·0 + 5/14·0.971 = 0.694",
    },
    {
      name: "Information Gain",
      formula: ["Gain(A) = I(S) − E(A)"],
      explain: "الأعلى = الجذر. لا يكون سالباً.",
      example: "Gain(age) = 0.940 − 0.694 = 0.246",
    },
  ],
  shortcuts: [
    "التصنيف = **مرحلتان**: بناء النموذج (شجرة/صيغة/قواعد) ثم استخدامه بعد التحقق من **الدقة**.",
    "Test set **مستقل** عن Training set، وإلا **Overfitting**.",
    "**Supervised** = في labels (Classification). **Unsupervised** = بدون labels (Clustering).",
    "تجهيز قبل التصنيف: **Cleaning، Relevance analysis (Feature Selection)، Transformation**.",
    "معايير التقييم: **الدقة (الأهم)**، السرعة، المتانة، التوسع، التفسير، جودة القواعد.",
    "**1R** = شجرة **مستوى واحد**، **صفة واحدة**، كل قيمة ← الأغلبية، نختار الصفة **بأقل خطأ كلي**.",
    "1R: تعادل ← `*` ، القيم المفقودة ← قيمة `null` جديدة (لذلك **متينة**).",
    "مثال الطقس بـ 1R: **Outlook و Humidity** بخطأ **4/14**.",
    "**Naïve Bayes** = كل الصفات، **نفس الأهمية + مستقلة**، نموذج **احتمالي** (ليس شجرة).",
    "Bayes: `P(H|X) = P(X|H)·P(H) / P(X)` ← **احذف P(X)** وقارن البسط.",
    "استقلال ⇒ **التقاطع يصبح جداء**: `P(X|C) = Π P(Xk|C)`.",
    "احسب فقط القيم **المطابقة للعينة**، والمقام = **عدد سجلات الصنف** (9 لـ Yes و 5 لـ No).",
    "عيب NB: **الاستقلال غير واقعي** ← الحل **Bayesian Belief Networks**.",
    "**ID3** = صفات **متقطعة**، شجرة، **عودية**، الجذر = **أعلى Gain**.",
    "buys_computer: **age** جذر (0.246) ← `<=30` student ، `31…40` Yes ، `>40` credit_rating.",
    "لا صفات متبقية ← **أغلبية مع نسبة خطأ**. تعادل تام ← لا قرار.",
  ],
  mcq: [
    {
      q: "مرحلتا التصنيف هما:",
      options: [
        "التجميع ثم التنظيف",
        "بناء النموذج ثم استخدامه",
        "التدريب ثم التجميع",
        "الدمج ثم التحويل",
      ],
      answer: 1,
      why: "Model construction ثم Model usage بعد التحقق من الدقة.",
    },
    {
      q: "لماذا يجب أن يكون test set مستقلاً عن training set؟",
      options: [
        "لتسريع التدريب",
        "لتجنب Overfitting والحصول على دقة حقيقية",
        "لتقليل عدد الصفات",
        "لأن الخوارزمية لا تقبل نفس البيانات",
      ],
      answer: 1,
      why: "مثل اختبار الطفل بنفس الكلمة التي تدرب عليها.",
    },
    {
      q: "نموذج صنّف 4 سجلات اختبار، أخطأ في واحد منها. الدقة:",
      options: ["25%", "50%", "75%", "100%"],
      answer: 2,
      why: "3/4 = 75%.",
    },
    {
      q: "التعلم بدون إشراف (Unsupervised) مثاله:",
      options: ["Classification", "Clustering", "Naïve Bayes", "1R"],
      answer: 1,
      why: "لا توجد labels مسبقاً.",
    },
    {
      q: "Relevance analysis يُعرف أيضاً بـ:",
      options: ["Data Cleaning", "Feature Selection", "Normalization", "Discretization"],
      answer: 1,
      why: "نحافظ على الصفات المرتبطة بالظاهرة ونحذف غيرها.",
    },
    {
      q: "أهم معيار لتقييم خوارزمية التصنيف:",
      options: ["السرعة", "قابلية التوسع", "الدقة", "حجم الشجرة"],
      answer: 2,
      why: "وعند تساوي الدقة ننتقل لباقي المعايير.",
    },
    {
      q: "خوارزمية 1R تعتمد على:",
      options: [
        "كل الصفات بنفس الأهمية",
        "صفة واحدة فقط (شجرة من مستوى واحد)",
        "شجرة متعددة المستويات",
        "مسافة إقليدية",
      ],
      answer: 1,
      why: "صفة واحدة تتحكم بالتصنيف.",
    },
    {
      q: "في 1R نختار الصفة ذات:",
      options: ["أكبر عدد قيم", "أقل خطأ كلي", "أعلى Gain", "أكبر احتمال"],
      answer: 1,
      why: "Total error الأقل.",
    },
    {
      q: "في 1R، قيمة الصفة hot فيها 2 Yes و 2 No. نكتب:",
      options: ["hot → yes بخطأ 0", "hot → no* بخطأ 2/4", "نحذف القيمة", "hot → null"],
      answer: 1,
      why: "التعادل يُعلَّم بـ * والخطأ 2/4.",
    },
    {
      q: "كيف تتعامل 1R مع القيم المفقودة؟",
      options: [
        "تحذف السجل",
        "تعاملها كقيمة جديدة null",
        "تستبدلها بالمتوسط",
        "تتوقف الخوارزمية",
      ],
      answer: 1,
      why: "ولهذا تعتبر متينة.",
    },
    {
      q: "صفة لها القيم: A (3 Yes, 1 No) و B (1 Yes, 3 No) و C (2 Yes, 2 No). Total error في 1R:",
      options: ["4/12", "3/12", "2/12", "6/12"],
      answer: 0,
      why: "(1 + 1 + 2) / (4 + 4 + 4) = 4/12.",
    },
    {
      q: "افتراضا Naïve Bayes:",
      options: [
        "الصفات مرتبطة ومختلفة الأهمية",
        "الصفات بنفس الأهمية ومستقلة إحصائياً",
        "صفة واحدة تتحكم بالتصنيف",
        "البيانات مستمرة فقط",
      ],
      answer: 1,
      why: "الاستقلال غير واقعي لكنها تعمل جيداً عملياً.",
    },
    {
      q: "في نظرية بايز، P(H) تمثل:",
      options: [
        "احتمال العينة",
        "المعرفة المسبقة (احتمال الصنف)",
        "الاحتمال الشرطي للعينة",
        "احتمال الخطأ",
      ],
      answer: 1,
      why: "مثلاً P(Yes) = 9/14.",
    },
    {
      q: "لماذا يمكن حذف P(X) عند المقارنة بين الأصناف؟",
      options: [
        "لأنها تساوي صفراً",
        "لأنها موجبة وثابتة لكل الأصناف فلا تغيّر الترتيب",
        "لأنها تساوي 1",
        "لأنها غير معروفة",
      ],
      answer: 1,
      why: "القسمة على عدد موجب لا تغيّر جهة المتراجحة.",
    },
    {
      q: "بسبب فرض الاستقلال في Naïve Bayes فإن P(X1, X2 | C) يساوي:",
      options: [
        "P(X1|C) + P(X2|C)",
        "P(X1|C) × P(X2|C)",
        "P(X1|C) / P(X2|C)",
        "max(P(X1|C), P(X2|C))",
      ],
      answer: 1,
      why: "التقاطع يتحول إلى جداء.",
    },
    {
      q: "في بيانات buys_computer (9 Yes و 5 No)، يوجد 2 سجل age<=30 من الـ Yes. P(age<=30 | Yes) =",
      options: ["2/14", "2/9", "2/5", "5/14"],
      answer: 1,
      why: "المقام عدد سجلات الصنف Yes = 9.",
    },
    {
      q: "P(X|Yes)·P(Yes) = 0.028 و P(X|No)·P(No) = 0.007. التصنيف:",
      options: ["No", "Yes", "لا يمكن التحديد", "كلاهما"],
      answer: 1,
      why: "نختار القيمة الأعظم.",
    },
    {
      q: "الحل لمشكلة التبعية بين الصفات في Naïve Bayes:",
      options: ["1R", "ID3", "Bayesian Belief Networks", "K-means"],
      answer: 2,
      why: "شبكات الاعتقاد البايزية تنمذج التبعيات.",
    },
    {
      q: "في ID3 نختار كجذر الصفة ذات:",
      options: ["أعلى Entropy", "أعلى Information Gain", "أقل عدد قيم", "أكبر خطأ"],
      answer: 1,
      why: "الأعلى Gain = الأقل E = تقلل الاحتمالات.",
    },
    {
      q: "قيمة I(s1, s2) عندما يكون عدد سجلات الصنفين متساوياً:",
      options: ["0", "0.5", "1", "2"],
      answer: 2,
      why: "−(½log₂½ + ½log₂½) = 1.",
    },
    {
      q: "في buys_computer كانت Gain(age) = 0.246 و Gain(student) = 0.151. الجذر:",
      options: ["student", "age", "income", "credit_rating"],
      answer: 1,
      why: "age صاحبة أعلى Gain.",
    },
    {
      q: "في فرع لم نصل فيه لقرار ولم تبقَ صفات للدراسة في ID3:",
      options: [
        "نحذف الفرع",
        "نأخذ الأغلبية مع ذكر نسبة الخطأ",
        "نعيد الخوارزمية من البداية",
        "نختار صنفاً عشوائياً دون ذكر خطأ",
      ],
      answer: 1,
      why: "وإذا كان تعادلاً تاماً لا يمكن اتخاذ قرار.",
    },
  ],
  exercises: [
    {
      title: "مثال 1: خوارزمية 1R على بيانات الطقس",
      problem: [
        {
          type: "p",
          text: "طبّق `1R` على البيانات التالية وحدد الصفة المعتمدة وقواعدها:",
        },
        { type: "table", ltr: true, head: WEATHER_HEAD, rows: WEATHER_ROWS },
      ],
      solution: [
        {
          type: "p",
          text: "لكل صفة ولكل قيمة نعدّ `yes/no`، ونأخذ الأغلبية، والخطأ = عدد الأقلية ÷ عدد سجلات القيمة:",
        },
        {
          type: "table",
          ltr: true,
          head: ["Attribute", "Value", "yes / no", "Rule", "Error"],
          rows: [
            ["Outlook", "sunny", "2 / 3", "→ no", "2/5"],
            ["", "overcast", "4 / 0", "→ yes", "0/4"],
            ["", "rainy", "3 / 2", "→ yes", "2/5"],
            ["Temp", "hot", "2 / 2", "→ no*", "2/4"],
            ["", "mild", "4 / 2", "→ yes", "2/6"],
            ["", "cool", "3 / 1", "→ yes", "1/4"],
            ["Humidity", "high", "3 / 4", "→ no", "3/7"],
            ["", "normal", "6 / 1", "→ yes", "1/7"],
            ["Windy", "false", "6 / 2", "→ yes", "2/8"],
            ["", "true", "3 / 3", "→ no*", "3/6"],
          ],
        },
        {
          type: "formula",
          lines: [
            "Total error:",
            "Outlook  = (2+0+2)/(5+4+5) = 4/14",
            "Temp     = (2+2+1)/(4+6+4) = 5/14",
            "Humidity = (3+1)/(7+7)     = 4/14",
            "Windy    = (2+3)/(8+6)     = 5/14",
          ],
        },
        {
          type: "p",
          text: "أقل خطأ `4/14` لـ `Outlook` و `Humidity`. نعتمد مثلاً `Outlook`: **sunny → no ، overcast → yes ، rainy → yes**.",
        },
      ],
      answer: "Outlook أو Humidity بخطأ 4/14 — قواعد Outlook: sunny→no ، overcast→yes ، rainy→yes",
    },
    {
      title: "مثال 2: دقة نموذج Tenured",
      problem: [
        {
          type: "p",
          text: "النموذج: `IF rank = 'professor' OR years > 6 THEN tenured = 'yes'` (وإلا `no`). احسب دقته على بيانات الاختبار:",
        },
        {
          type: "table",
          ltr: true,
          head: ["Name", "Rank", "Years", "Tenured (actual)"],
          rows: [
            ["Tom", "Assistant Prof", "2", "no"],
            ["Merlisa", "Associate Prof", "7", "no"],
            ["George", "Professor", "5", "yes"],
            ["Joseph", "Assistant Prof", "7", "yes"],
          ],
        },
      ],
      solution: [
        {
          type: "table",
          ltr: true,
          head: ["Name", "professor?", "years > 6?", "Predicted", "Actual", "✓/✗"],
          rows: [
            ["Tom", "no", "no", "no", "no", "✓"],
            ["Merlisa", "no", "yes", "yes", "no", "✗"],
            ["George", "yes", "—", "yes", "yes", "✓"],
            ["Joseph", "no", "yes", "yes", "yes", "✓"],
          ],
        },
        { type: "formula", lines: ["Accuracy = 3 / 4 = 75%"] },
        {
          type: "note",
          text: "الاسم لا يدخل في القرار. والشرط `OR` يكفيه تحقق أحد الطرفين.",
        },
      ],
      answer: "الدقة = 75% (خطأ واحد في Merlisa)",
    },
    {
      title: "مثال 3: Naïve Bayes — مثال المحاضرة",
      problem: [
        {
          type: "p",
          text: "باستخدام بيانات `buys_computer`، صنّف العينة `X = (age <= 30, income = medium, student = yes, credit_rating = fair)`:",
        },
        { type: "table", ltr: true, head: BUYS_HEAD, rows: BUYS_ROWS },
      ],
      solution: [
        {
          type: "p",
          text: "**المعرفة المسبقة**: `Yes = 9` و `No = 5` ⇒ `P(Yes) = 9/14` و `P(No) = 5/14`.",
        },
        {
          type: "p",
          text: "**الخطوة 1**: احتمالات القيم المطابقة للعينة فقط (المقام 9 لـ Yes و 5 لـ No):",
        },
        {
          type: "formula",
          lines: [
            "age<=30 : Yes {9,11} → 2/9 = 0.222      No {1,2,8} → 3/5 = 0.6",
            "medium  : Yes {4,10,11,12} → 4/9 = 0.444 No {8,14} → 2/5 = 0.4",
            "student : Yes {5,7,9,10,11,13} → 6/9 = 0.667   No {6} → 1/5 = 0.2",
            "fair    : Yes {3,4,5,9,10,13} → 6/9 = 0.667    No {1,8} → 2/5 = 0.4",
          ],
        },
        {
          type: "formula",
          lines: [
            "Step 2:  P(X|Yes) = 0.222 × 0.444 × 0.667 × 0.667 = 0.044",
            "         P(X|No)  = 0.6 × 0.4 × 0.2 × 0.4       = 0.019",
            "Step 3:  P(X|Yes)·P(Yes) = 0.044 × 9/14 = 0.028",
            "         P(X|No)·P(No)   = 0.019 × 5/14 = 0.007",
            "Step 4:  0.028 > 0.007  →  Yes",
          ],
        },
      ],
      answer: "buys_computer = Yes (0.028 مقابل 0.007)",
    },
    {
      title: "مثال 4: Naïve Bayes — عينة ثانية",
      problem: [
        {
          type: "p",
          text: "بنفس البيانات، صنّف العينة `X = (age > 40, income = low, student = no, credit_rating = excellent)`.",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "age>40    : Yes {4,5,10} → 3/9 = 0.333      No {6,14} → 2/5 = 0.4",
            "low       : Yes {5,7,9} → 3/9 = 0.333       No {6} → 1/5 = 0.2",
            "student=no: Yes {3,4,12} → 3/9 = 0.333      No {1,2,8,14} → 4/5 = 0.8",
            "excellent : Yes {7,11,12} → 3/9 = 0.333     No {2,6,14} → 3/5 = 0.6",
          ],
        },
        {
          type: "formula",
          lines: [
            "P(X|Yes) = 0.333⁴ = 0.0123   → × 9/14 = 0.0079",
            "P(X|No)  = 0.4 × 0.2 × 0.8 × 0.6 = 0.0384 → × 5/14 = 0.0137",
            "0.0137 > 0.0079  →  No",
          ],
        },
        {
          type: "note",
          text: "رغم أن `P(Yes)` أكبر مسبقاً (9/14)، فإن احتمالات الصفات رجّحت `No`. لا تعتمد على المعرفة المسبقة لوحدها.",
        },
      ],
      answer: "buys_computer = No (0.0137 مقابل 0.0079)",
    },
    {
      title: "مثال 5: اختيار جذر الشجرة بـ ID3",
      problem: [
        {
          type: "p",
          text: "بنفس بيانات `buys_computer`، احسب `Information Gain` لكل صفة وحدد الجذر.",
        },
      ],
      solution: [
        {
          type: "formula",
          lines: [
            "I(9,5) = −(9/14)log₂(9/14) − (5/14)log₂(5/14) = 0.410 + 0.530 = 0.940",
          ],
        },
        {
          type: "table",
          ltr: true,
          head: ["age", "yes", "no", "I"],
          rows: [
            ["<=30", "2", "3", "0.971"],
            ["31…40", "4", "0", "0"],
            [">40", "3", "2", "0.971"],
          ],
        },
        {
          type: "formula",
          lines: [
            "E(age) = 5/14·0.971 + 4/14·0 + 5/14·0.971 = 0.694",
            "Gain(age) = 0.940 − 0.694 = 0.246",
          ],
        },
        {
          type: "formula",
          lines: [
            "income : high(2,2)=1 , medium(4,2)=0.918 , low(3,1)=0.811",
            "         E = 4/14·1 + 6/14·0.918 + 4/14·0.811 = 0.911 → Gain = 0.029",
            "student: yes(6,1)=0.592 , no(3,4)=0.985",
            "         E = 7/14·0.592 + 7/14·0.985 = 0.788 → Gain = 0.151",
            "credit : fair(6,2)=0.811 , excellent(3,3)=1",
            "         E = 8/14·0.811 + 6/14·1 = 0.892 → Gain = 0.048",
          ],
        },
        {
          type: "p",
          text: "أعلى `Gain` لـ **`age`** ← الجذر. وفرع `31…40` نقي (4 yes) ← ورقة `Yes` مباشرة.",
        },
      ],
      answer: "Gain: age 0.246 ، student 0.151 ، credit 0.048 ، income 0.029 ⇒ الجذر age",
    },
    {
      title: "مثال 6: المستوى الثاني من الشجرة (فرع age <= 30)",
      problem: [
        {
          type: "p",
          text: "بعد اختيار `age` كجذر، خذ سجلات فرع `age <= 30` فقط (السجلات 1، 2، 8، 9، 11)، احذف عمود `age`، وحدد الصفة التالية.",
        },
      ],
      solution: [
        {
          type: "table",
          ltr: true,
          head: ["#", "income", "student", "credit", "buys"],
          rows: [
            ["1", "high", "no", "fair", "no"],
            ["2", "high", "no", "excellent", "no"],
            ["8", "medium", "no", "fair", "no"],
            ["9", "low", "yes", "fair", "yes"],
            ["11", "medium", "yes", "excellent", "yes"],
          ],
        },
        {
          type: "formula",
          lines: [
            "I(2,3) = 0.971",
            "student: yes(2,0)=0 , no(0,3)=0           → E = 0     → Gain = 0.971",
            "income : high(0,2)=0 , medium(1,1)=1 , low(1,0)=0",
            "         E = 2/5·1 = 0.4                    → Gain = 0.571",
            "credit : fair(1,2)=0.918 , excellent(1,1)=1",
            "         E = 3/5·0.918 + 2/5·1 = 0.951      → Gain = 0.020",
          ],
        },
        {
          type: "p",
          text: "**`student`** أعلى `Gain` (والفرعان نقيان): `student = yes → Yes` و `student = no → No`. وبنفس الطريقة فرع `>40` يُقسم على `credit_rating`.",
        },
      ],
      answer: "الصفة التالية في فرع age<=30 هي student (Gain = 0.971)",
    },
    {
      title: "مثال 7: مقارنة الخوارزميات الثلاث على سجل واحد",
      problem: [
        {
          type: "p",
          text: "صنّف العينة `X = (age <= 30, income = medium, student = no, credit_rating = fair)` باستخدام: شجرة `ID3` الناتجة، و `Naïve Bayes`.",
        },
      ],
      solution: [
        {
          type: "p",
          text: "**ID3**: `age <= 30` ← ننظر لـ `student` ← `no` ← **No**.",
        },
        {
          type: "formula",
          lines: [
            "Naïve Bayes:",
            "P(X|Yes) = 2/9 × 4/9 × 3/9 × 6/9 = 0.222 × 0.444 × 0.333 × 0.667 = 0.0219",
            "         × 9/14 = 0.0141",
            "P(X|No)  = 3/5 × 2/5 × 4/5 × 2/5 = 0.6 × 0.4 × 0.8 × 0.4 = 0.0768",
            "         × 5/14 = 0.0274",
            "0.0274 > 0.0141  →  No",
          ],
        },
        {
          type: "note",
          text: "هنا اتفقت الخوارزميتان، لكن **ليس بالضرورة أن تعطي كل الخوارزميات نفس التصنيف**، ولهذا نقارن بالدقة على بيانات اختبار.",
        },
      ],
      answer: "ID3 = No ، Naïve Bayes = No (0.0274 مقابل 0.0141)",
    },
  ],
};
