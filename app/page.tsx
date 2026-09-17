"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faBars, faBullseye, faCircleNodes, faEnvelope, faFax, faHandshake, faLocationDot, faPhone, faShieldHalved, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";

export type Lang = "zh" | "ja" | "en";
export type TextValue = Record<Lang, string>;

export function ContactCta({ lang }: { lang: Lang }) {
  const label = lang === "zh" ? "與我們聯繫" : lang === "ja" ? "お問い合わせ" : "Contact us";
  return <section className="contact-cta" aria-label={label}><Link className="contact-cta-link" href="/contact"><span className="contact-cta-icon" aria-hidden="true"><FontAwesomeIcon icon={faEnvelope} /></span><span className="contact-cta-label">{label}</span><span className="contact-cta-arrow" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span></Link></section>;
}

export const navItems: { id: string; href: string; label: TextValue }[] = [
  { id: "about", href: "/about", label: { zh: "關於長芸", ja: "長芸について", en: "About Chy" } },
  { id: "services", href: "/services", label: { zh: "加工服務", ja: "加工サービス", en: "Services" } },
  { id: "capacity", href: "/capacity", label: { zh: "加工能力", ja: "加工能力", en: "Capabilities" } },
  { id: "equipment", href: "/equipment", label: { zh: "生產設備", ja: "設備紹介", en: "Equipment" } },
  { id: "quality", href: "/quality", label: { zh: "品質檢驗", ja: "品質検査", en: "Quality" } },
  { id: "cases", href: "/cases", label: { zh: "產品介紹", ja: "事例実績", en: "Track Record" } },
  { id: "contact", href: "/contact", label: { zh: "聯絡我們", ja: "お問い合わせ", en: "Contact" } },
];

export const copy: Record<Lang, Record<string, string>> = {
  zh: {
    utility: "精密研磨．CNC 車削．品質檢驗",
    heroEyebrow: "CHY / 精密製造",
    heroTitleLead: "專注",
    heroTitleAccent: "精密研磨",
    heroTitleJoin: "，",
    heroTitleSecond: "成就每一道",
    heroTitleAccent2: "關鍵精度",
    heroTitleEnd: "。",
    heroBody: "長芸累積多年精密機械零件加工經驗，以穩定的加工技術與嚴謹的品質檢驗，滿足各產業對精度的高度要求。",
    heroPrimary: "了解加工能力",
    heroService1: "內外徑精密研磨",
    heroService2: "CNC 車削加工",
    heroService3: "整合加工服務",
    precisionLabel: "μm 級精度",
    precisionValue: "研磨 / 車削 / 品質檢驗",
    aboutEyebrow: "ABOUT CHY",
    aboutTitle: "關於長芸",
    aboutBody: "長芸有限公司專注於精密機械零件加工，從內、外徑精密研磨起家，累積多年在軸、套筒、齒輪及各式精密機械機構零組件之加工經驗。",
    aboutLink: "了解更多",
    serviceEyebrow: "WHAT WE DO",
    serviceTitle: "加工服務及生產流程",
    serviceBody: "以精密研磨為核心，串連 CNC 車削與合作加工，為機械工具、汽車零件與工業設備提供穩定的精密零件製造。",
    productionEyebrow: "PRODUCTION FLOW",
    productionTitle: "生產流程",
    productionSubtitle: "從圖面評估到成品出貨的一站式整合加工流程",
    productionBody: "依據產品需求整合車削、銑削、熱處理、研磨及品質檢驗，提供穩定且完整的製程管理。",
    productionCount: "11 道製程",
    productionNote: "每一道加工，都有清楚的銜接與品質依據。",
    capacityEyebrow: "CAPABILITIES",
    capacityTitle: "讓每一個尺寸，都有可被驗證的依據。",
    capacityBody: "CNC 車削、內外徑研磨與量測檢驗，組成長芸完整的加工能力。",
    equipmentEyebrow: "EQUIPMENT",
    equipmentTitle: "設備與經驗，支撐穩定的交期與品質。",
    equipmentBody: "依照零件形狀、尺寸與精度要求，選擇合適設備與加工條件。",
    casesEyebrow: "TRACK RECORD",
    casesTitle: "熟悉關鍵零件，也重視每一次交付。",
    casesBody: "支援機械工具、汽車零件與工業設備客戶，提供符合圖面與公差要求的精密組件。",
    qualityEyebrow: "QUALITY",
    qualityTitle: "嚴格檢驗，讓品質更穩定",
    qualityBody: "從進料、製程到出貨，每一個環節都留下清楚的品質依據。",
    industryEyebrow: "INDUSTRIES",
    industryTitle: "服務需要精度的製造現場。",
    industryBody: "以穩定加工品質，成為客戶長期信賴的合作夥伴。",
    contactEyebrow: "CONTACT",
    contactTitle: "帶著您的圖面，和我們討論合適的加工方式。",
    contactBody: "提供零件尺寸、材質、公差與數量，我們會協助評估加工流程。",
    contactPerson: "陳先生／長芸有限公司",
    formNotice: "目前為展示用表單，尚未串接寄送功能。",
    formButton: "送出詢問",
    formDone: "已收到您的詢問預覽。",
    menu: "選單",
    close: "關閉",
    footerDescription: "專注精密研磨，提供穩定可靠的精密零件加工服務。",
    footerQuickLinks: "快速導覽",
    footerContact: "聯絡長芸",
    footerAddress: "台中市大甲區重義一路151號",
    nextEyebrow: "PRECISION IN EVERY STEP",
    nextTitle: "從圖面到成品，讓每一次交付都值得信賴。",
    nextLink: "查看加工服務",
  },
  ja: {
    utility: "精密研磨．CNC旋盤．品質検査",
    heroEyebrow: "CHY / 精密製造",
    heroTitleLead: "精密研磨に",
    heroTitleAccent: "集中し",
    heroTitleJoin: "、",
    heroTitleSecond: "重要な精度を",
    heroTitleAccent2: "実現します",
    heroTitleEnd: "。",
    heroBody: "長芸は精密機械部品の加工経験を積み重ね、安定した加工技術と厳格な品質検査で高精度の要求に応えます。",
    heroPrimary: "加工能力を見る",
    heroService1: "内外径精密研磨",
    heroService2: "CNC旋盤加工",
    heroService3: "一貫加工サービス",
    precisionLabel: "μmレベル精度",
    precisionValue: "研磨 / 旋盤 / 品質検査",
    aboutEyebrow: "ABOUT CHY",
    aboutTitle: "長芸について",
    aboutBody: "精密機械部品の加工を専門とし、内径・外径研磨を起点に、軸、スリーブ、歯車などの加工経験を積み重ねています。",
    aboutLink: "詳しく見る",
    serviceEyebrow: "WHAT WE DO",
    serviceTitle: "図面から完成品まで、工程をまとめて管理します。",
    serviceBody: "精密研磨を中心に、CNC旋盤と協力加工を組み合わせます。",
    productionEyebrow: "PRODUCTION FLOW",
    productionTitle: "生産工程",
    productionSubtitle: "図面評価から完成品出荷まで、一貫した加工フロー",
    productionBody: "製品の要件に合わせて旋盤、フライス、熱処理、研削、品質検査を組み合わせ、安定した工程管理を提供します。",
    productionCount: "11工程",
    productionNote: "すべての工程を明確につなぎ、品質の根拠を残します。",
    capacityEyebrow: "CAPABILITIES",
    capacityTitle: "すべての寸法に、検証できる根拠を。",
    capacityBody: "CNC旋盤、内外径研磨、測定検査を一つの加工能力として提供します。",
    equipmentEyebrow: "EQUIPMENT",
    equipmentTitle: "設備と経験が、安定した納期と品質を支えます。",
    equipmentBody: "形状、寸法、精度の要求に合わせて設備と条件を選定します。",
    casesEyebrow: "TRACK RECORD",
    casesTitle: "重要部品に慣れ、納品を大切にします。",
    casesBody: "工作機械、自動車、産業設備向けの精密部品を提供します。",
    qualityEyebrow: "QUALITY",
    qualityTitle: "厳格な検査で、品質を安定させます。",
    qualityBody: "受入から工程、出荷まで、品質の根拠を明確に残します。",
    industryEyebrow: "INDUSTRIES",
    industryTitle: "精度が必要な製造現場へ。",
    industryBody: "安定した加工品質で長期協力を支えます。",
    contactEyebrow: "CONTACT",
    contactTitle: "図面をお持ちください。最適な加工方法を相談しましょう。",
    contactBody: "寸法、材質、公差、数量をお知らせください。",
    contactPerson: "長芸有限公司",
    formNotice: "デモ用フォームです。送信機能は未接続です。",
    formButton: "問い合わせる",
    formDone: "問い合わせ内容を確認しました。",
    menu: "メニュー",
    close: "閉じる",
    footerDescription: "精密研磨に集中し、安定した部品加工を提供します。",
    footerQuickLinks: "クイックリンク",
    footerContact: "お問い合わせ",
    footerAddress: "台湾 台中市",
    nextEyebrow: "PRECISION IN EVERY STEP",
    nextTitle: "図面から完成品まで、信頼できる納品を。",
    nextLink: "加工サービスを見る",
  },
  en: {
    utility: "Precision grinding · CNC turning · Quality inspection",
    heroEyebrow: "CHY / PRECISION IN MOTION",
    heroTitleLead: "Focused on",
    heroTitleAccent: "precision grinding",
    heroTitleJoin: ".",
    heroTitleSecond: "Built for every",
    heroTitleAccent2: "critical tolerance",
    heroTitleEnd: ".",
    heroBody: "Chung Uen brings years of precision machining experience to every part, pairing stable processes with disciplined inspection for demanding industries.",
    heroPrimary: "Explore capabilities",
    heroService1: "ID / OD precision grinding",
    heroService2: "CNC turning",
    heroService3: "Integrated processing",
    precisionLabel: "μm LEVEL PRECISION",
    precisionValue: "GRINDING / TURNING / INSPECTION",
    aboutEyebrow: "ABOUT CHY",
    aboutTitle: "About Chy",
    aboutBody: "Chung Uen specializes in precision mechanical parts, with experience across internal and external grinding, shafts, sleeves, gears, and custom components.",
    aboutLink: "Learn more",
    serviceEyebrow: "WHAT WE DO",
    serviceTitle: "One accountable path from drawing to finished part.",
    serviceBody: "Precision grinding at the core, coordinated with CNC turning and partner processes.",
    productionEyebrow: "PRODUCTION FLOW",
    productionTitle: "Production flow",
    productionSubtitle: "One integrated process from drawing review to shipment",
    productionBody: "We coordinate turning, milling, heat treatment, grinding, and inspection around each part requirement.",
    productionCount: "11 STEPS",
    productionNote: "Every handoff stays clear, controlled, and accountable.",
    capacityEyebrow: "CAPABILITIES",
    capacityTitle: "Every dimension backed by a verifiable process.",
    capacityBody: "CNC turning, ID / OD grinding, and inspection form one connected capability.",
    equipmentEyebrow: "EQUIPMENT",
    equipmentTitle: "Equipment and experience behind dependable output.",
    equipmentBody: "We match equipment and process conditions to each part's geometry, size, and tolerance.",
    casesEyebrow: "TRACK RECORD",
    casesTitle: "Comfortable with critical parts. Serious about delivery.",
    casesBody: "Precision components for machine tools, automotive parts, and industrial equipment.",
    qualityEyebrow: "QUALITY",
    qualityTitle: "Disciplined inspection makes quality repeatable.",
    qualityBody: "Incoming material, process control, final inspection, and shipment stay visible.",
    industryEyebrow: "INDUSTRIES",
    industryTitle: "Supporting manufacturing environments where precision matters.",
    industryBody: "Stable machining quality for long-term partnerships.",
    contactEyebrow: "CONTACT",
    contactTitle: "Bring your drawing. Let us find the right process.",
    contactBody: "Share dimensions, material, tolerance, and quantity for a practical review.",
    contactPerson: "Chung Uen Co., Ltd.",
    formNotice: "Demo form only. Submission is not connected yet.",
    formButton: "Send inquiry",
    formDone: "Your inquiry preview is ready.",
    menu: "MENU",
    close: "CLOSE",
    footerDescription: "Focused grinding. Dependable precision.",
    footerQuickLinks: "QUICK LINKS",
    footerContact: "CONTACT CHY",
    footerAddress: "Taichung, Taiwan",
    nextEyebrow: "PRECISION IN EVERY STEP",
    nextTitle: "From drawing to finished part, every delivery should earn trust.",
    nextLink: "View services",
  },
};

export const aboutContent: Record<Lang, {
  overview: string;
  detail: string;
  story: string[];
  historyEyebrow: string;
  historyTitle: string;
  historyBody: string;
}> = {
  zh: {
    overview: "專注於工作母機主軸、套筒及精密軸類零件製造，提供內外徑精密研磨與多製程整合加工服務。",
    detail: "長芸有限公司深耕精密機械加工領域多年，前身為1998年成立的「春興工業社」，初期以機械零件之外徑、內徑精密研磨加工為主要業務，憑藉穩定的加工品質與多年累積的技術經驗，逐步建立客戶信賴。",
    story: [
      "隨著業務拓展與加工需求提升，於2003年正式成立「長芸有限公司」，並進一步投入工作母機主軸、套筒、軸類零件及各類精密機械零組件之製造與加工。",
      "為提升加工精度、生產效率及品質穩定性，自2004年起陸續導入日本製 CNC 精密磨床設備，逐步朝向 CNC 化與高精度加工發展。2014年成立第二廠，持續擴充生產設備與加工產能，以因應不同客戶與多樣化零件的製造需求。",
      "長芸具備多年內、外徑精密研磨及工具機零組件加工經驗，長期承製工作母機主軸、套筒及相關精密零件，並透過穩定的協力加工體系，整合車削、銑削、熱處理、表面處理及精密研磨等製程，累積豐富的精密零件加工經驗。",
      "從材料準備、加工、委外管理、進料檢驗、製程檢驗至最終出貨，提供客戶完整且穩定的加工服務。",
      "多年來，長芸始終秉持「品質優先、誠信合作、持續精進」的經營理念，以專業的精密研磨技術、嚴謹的品質管理及彈性的製造能力，持續滿足客戶對精度、品質與交期的要求，致力成為客戶長期且值得信賴的精密加工合作夥伴。",
    ],
    historyEyebrow: "CHY TIMELINE",
    historyTitle: "長芸沿革",
    historyBody: "長芸有限公司長期專注於工作母機主軸、套筒及傳統產業機械相關零組件之製造加工，從接單、交期規劃、委外加工、進料檢驗至最終出貨，持續強化製程管理與品質控管。隨著加工需求與技術能力提升，公司逐年擴充設備、廠房與檢驗能力，奠定今日精密加工與研磨製造的基礎。",
  },
  ja: {
    overview: "長芸は精密機械部品の加工を専門とし、内径・外径研削を起点に、シャフト、スリーブ、ギヤなど幅広い部品の加工経験を積み重ねてきました。",
    detail: "図面を正確に読み取り、材質、寸法、公差、数量に合わせて工程を組み立てます。精密研削、CNC旋盤、品質検査を一つの窓口でつなぎます。",
    story: [
      "事業の拡大に伴い、2003年に長芸有限公司を設立し、工作機械主軸、スリーブ、シャフトなどの精密部品加工へ領域を広げました。",
      "2004年から日本製CNC精密研削盤を導入し、加工精度、生産効率、品質の安定性を高めてきました。2014年には第二工場を設立しました。",
      "内外径研削と工作機械部品の経験をもとに、旋盤、フライス、熱処理、表面処理、精密研削を協力加工体制でつないでいます。",
      "材料準備から加工、外注管理、受入検査、工程検査、出荷まで、安定した加工サービスを提供します。",
      "品質優先、誠実な協力、継続的な改善を大切にし、精度、品質、納期に応える長期的なパートナーを目指します。",
    ],
    historyEyebrow: "CHY TIMELINE",
    historyTitle: "長芸の沿革",
    historyBody: "精密研削の専門性を基盤に、工作機械、自動車部品、産業設備の現場を支える安定した製造体制を築いてきました。",
  },
  en: {
    overview: "Chung Uen specializes in precision mechanical parts, with roots in internal and external grinding and years of experience across shafts, sleeves, gears, and custom components.",
    detail: "We read each drawing closely, then match material, dimensions, tolerance, and quantity to the right process. Precision grinding, CNC turning, and inspection stay connected through one accountable workflow.",
    story: [
      "As demand grew, Chung Uen Co., Ltd. was formally established in 2003 and expanded into machine-tool spindles, sleeves, shafts, and precision mechanical components.",
      "From 2004, Japanese CNC precision grinders were introduced to improve accuracy, efficiency, and process stability. A second factory was established in 2014 to expand capacity.",
      "Years of ID / OD grinding and machine-tool component experience are connected with turning, milling, heat treatment, surface treatment, and precision grinding through a stable partner network.",
      "From material preparation and machining through outsourced-process management, incoming inspection, in-process inspection, and shipment, we provide a complete and dependable service.",
      "With quality first, honest collaboration, and continuous improvement as our principles, we work to become a trusted long-term precision-machining partner.",
    ],
    historyEyebrow: "CHY TIMELINE",
    historyTitle: "Chung Uen timeline",
    historyBody: "From a foundation in precision grinding to ongoing support for machine tools, automotive parts, and industrial equipment, we have built capability step by step.",
  },
};

type HomeBusinessSection = {
  eyebrow: TextValue;
  title: TextValue;
  body: TextValue;
};

type HomeBusinessValue = {
  title: TextValue;
  label: TextValue;
  body: TextValue;
};

export const homeBusinessContent: Record<Lang, {
  values: HomeBusinessSection & { items: HomeBusinessValue[] };
  mission: HomeBusinessSection & { detail: TextValue };
  service: HomeBusinessSection & { itemTitle: TextValue; itemBody: TextValue; link: TextValue };
  process: HomeBusinessSection & { steps: TextValue; link: TextValue };
}> = {
  zh: {
    values: {
      eyebrow: { zh: "OUR VALUES", ja: "OUR VALUES", en: "OUR VALUES" },
      title: { zh: "核心經營理念", ja: "経営理念", en: "Our values" },
      body: { zh: "長芸秉持穩健經營與持續精進的理念，將品質、客戶需求、生產技術與永續發展落實於每一道製程與服務之中。", ja: "長芸は堅実な経営と継続的な改善を大切にし、品質、お客様の要望、生産技術、持続可能な成長を一つひとつの工程とサービスに反映します。", en: "Chung Uen puts steady management and continuous improvement into practice through quality, customer needs, production technology, and sustainable growth in every process and service." },
      items: [
        { title: { zh: "品質第一", ja: "品質第一", en: "Quality first" }, label: { zh: "QUALITY FIRST", ja: "QUALITY FIRST", en: "QUALITY FIRST" }, body: { zh: "重視每一道加工與檢驗程序，以穩定品質作為長期合作的基礎。", ja: "すべての加工と検査を大切にし、安定した品質を長期的な協力の基盤とします。", en: "We value every machining and inspection step, making stable quality the foundation of long-term partnerships." } },
        { title: { zh: "顧客至上", ja: "お客様第一", en: "Customer first" }, label: { zh: "CUSTOMER FIRST", ja: "CUSTOMER FIRST", en: "CUSTOMER FIRST" }, body: { zh: "以客戶需求為核心，重視溝通、交期與服務，建立長期且值得信賴的合作關係。", ja: "お客様の要望を中心に、コミュニケーション、納期、サービスを大切にし、信頼される長期関係を築きます。", en: "We center every decision on customer needs, communication, delivery, and service to build trusted long-term relationships." } },
        { title: { zh: "卓越生產", ja: "卓越した生産", en: "Manufacturing excellence" }, label: { zh: "MANUFACTURING EXCELLENCE", ja: "MANUFACTURING EXCELLENCE", en: "MANUFACTURING EXCELLENCE" }, body: { zh: "持續提升加工技術、設備能力與製程管理，追求更高的精度、效率與品質穩定性。", ja: "加工技術、設備能力、工程管理を継続的に高め、精度、効率、品質の安定性を追求します。", en: "We continuously improve machining technology, equipment, and process management for greater precision, efficiency, and stability." } },
        { title: { zh: "永續經營", ja: "持続可能な成長", en: "Sustainable growth" }, label: { zh: "SUSTAINABLE GROWTH", ja: "SUSTAINABLE GROWTH", en: "SUSTAINABLE GROWTH" }, body: { zh: "持續投入人才、設備與技術，穩健經營並與客戶及員工共同成長。", ja: "人材、設備、技術への投資を続け、堅実に経営しながらお客様と社員とともに成長します。", en: "We invest in people, equipment, and technology to grow steadily with our customers and employees." } },
      ],
    },
    mission: {
      eyebrow: { zh: "OUR MISSION", ja: "OUR MISSION", en: "OUR MISSION" },
      title: { zh: "我們的目標", ja: "私たちの使命", en: "Our mission" },
      body: { zh: "追求精密、品質與永續，成為客戶值得信賴的精密加工夥伴。", ja: "精度、品質、持続可能性を追求し、お客様に信頼される精密加工パートナーを目指します。", en: "Pursuing precision, quality, and sustainability to become a precision-machining partner our customers can trust." },
      detail: { zh: "持續精進加工技術與製程能力，以穩定品質及專業服務，為客戶創造價值；同時打造良好的工作環境，與員工共同成長，實現企業永續經營。", ja: "加工技術と工程能力を高め、安定した品質と専門的なサービスでお客様に価値を届けます。同時に良い職場環境を整え、社員とともに成長し、持続可能な経営を実現します。", en: "We continuously advance our machining technology and process capabilities to create customer value through stable quality and professional service, while building a better workplace, growing with our employees, and pursuing sustainable operations." },
    },
    service: {
      eyebrow: { zh: "PRECISION MACHINING SERVICES", ja: "PRECISION MACHINING SERVICES", en: "PRECISION MACHINING SERVICES" },
      title: { zh: "專業加工服務", ja: "精密加工サービス", en: "Precision machining services" },
      body: { zh: "從單一研磨加工到完整零件製造，依據客戶圖面、精度及製程需求，提供彈性且完整的加工服務。", ja: "単一の研削加工から完成部品の製造まで、お客様の図面、精度、工程要件に合わせて柔軟で一貫した加工サービスを提供します。", en: "From a single grinding operation to complete part manufacturing, we provide flexible and comprehensive machining services based on each drawing, tolerance, and process requirement." },
      itemTitle: { zh: "整合加工服務", ja: "一貫加工サービス", en: "Integrated processing" },
      itemBody: { zh: "依客戶圖面整合材料準備、車削、銑削、熱處理、表面處理、精密研磨及最終檢驗等製程，提供從材料到成品的一站式加工服務。", ja: "お客様の図面に基づき、材料準備、旋盤、フライス、熱処理、表面処理、精密研削、最終検査までを組み合わせ、材料から完成品まで一貫して対応します。", en: "Based on the customer drawing, we coordinate material preparation, turning, milling, heat treatment, surface treatment, precision grinding, and final inspection for one-stop production from material to finished part." },
      link: { zh: "了解更多", ja: "詳しく見る", en: "Learn more" },
    },
    process: {
      eyebrow: { zh: "SERVICE PROCESS", ja: "SERVICE PROCESS", en: "SERVICE PROCESS" },
      title: { zh: "服務流程", ja: "サービスの流れ", en: "Service process" },
      body: { zh: "從圖面確認、製程規劃到加工、檢驗與出貨，長芸依據客戶需求安排合適製程，確保每一道加工環節穩定銜接。", ja: "図面確認、工程計画から加工、検査、出荷まで、お客様の要望に合わせた工程を組み、各工程を安定してつなぎます。", en: "From drawing review and process planning through machining, inspection, and shipment, Chung Uen arranges the right process for each customer need and keeps every step connected." },
      steps: { zh: "圖面確認 ／ 製程規劃 ／ 加工 ／ 檢驗 ／ 出貨", ja: "図面確認 ／ 工程計画 ／ 加工 ／ 検査 ／ 出荷", en: "DRAWING REVIEW ／ PROCESS PLANNING ／ MACHINING ／ INSPECTION ／ SHIPMENT" },
      link: { zh: "了解更多", ja: "詳しく見る", en: "Learn more" },
    },
  },
  ja: {
    values: {
      eyebrow: { zh: "OUR VALUES", ja: "OUR VALUES", en: "OUR VALUES" },
      title: { zh: "核心經營理念", ja: "経営理念", en: "Our values" },
      body: { zh: "長芸秉持穩健經營與持續精進的理念，將品質、客戶需求、生產技術與永續發展落實於每一道製程與服務之中。", ja: "長芸は堅実な経営と継続的な改善を大切にし、品質、お客様の要望、生産技術、持続可能な成長を一つひとつの工程とサービスに反映します。", en: "Chung Uen puts steady management and continuous improvement into practice through quality, customer needs, production technology, and sustainable growth in every process and service." },
      items: [
        { title: { zh: "品質第一", ja: "品質第一", en: "Quality first" }, label: { zh: "QUALITY FIRST", ja: "QUALITY FIRST", en: "QUALITY FIRST" }, body: { zh: "重視每一道加工與檢驗程序，以穩定品質作為長期合作的基礎。", ja: "すべての加工と検査を大切にし、安定した品質を長期的な協力の基盤とします。", en: "We value every machining and inspection step, making stable quality the foundation of long-term partnerships." } },
        { title: { zh: "顧客至上", ja: "お客様第一", en: "Customer first" }, label: { zh: "CUSTOMER FIRST", ja: "CUSTOMER FIRST", en: "CUSTOMER FIRST" }, body: { zh: "以客戶需求為核心，重視溝通、交期與服務，建立長期且值得信賴的合作關係。", ja: "お客様の要望を中心に、コミュニケーション、納期、サービスを大切にし、信頼される長期関係を築きます。", en: "We center every decision on customer needs, communication, delivery, and service to build trusted long-term relationships." } },
        { title: { zh: "卓越生產", ja: "卓越した生産", en: "Manufacturing excellence" }, label: { zh: "MANUFACTURING EXCELLENCE", ja: "MANUFACTURING EXCELLENCE", en: "MANUFACTURING EXCELLENCE" }, body: { zh: "持續提升加工技術、設備能力與製程管理，追求更高的精度、效率與品質穩定性。", ja: "加工技術、設備能力、工程管理を継続的に高め、精度、効率、品質の安定性を追求します。", en: "We continuously improve machining technology, equipment, and process management for greater precision, efficiency, and stability." } },
        { title: { zh: "永續經營", ja: "持続可能な成長", en: "Sustainable growth" }, label: { zh: "SUSTAINABLE GROWTH", ja: "SUSTAINABLE GROWTH", en: "SUSTAINABLE GROWTH" }, body: { zh: "持續投入人才、設備與技術，穩健經營並與客戶及員工共同成長。", ja: "人材、設備、技術への投資を続け、堅実に経営しながらお客様と社員とともに成長します。", en: "We invest in people, equipment, and technology to grow steadily with our customers and employees." } },
      ],
    },
    mission: {
      eyebrow: { zh: "OUR MISSION", ja: "OUR MISSION", en: "OUR MISSION" },
      title: { zh: "我們的目標", ja: "私たちの使命", en: "Our mission" },
      body: { zh: "追求精密、品質與永續，成為客戶值得信賴的精密加工夥伴。", ja: "精度、品質、持続可能性を追求し、お客様に信頼される精密加工パートナーを目指します。", en: "Pursuing precision, quality, and sustainability to become a precision-machining partner our customers can trust." },
      detail: { zh: "持續精進加工技術與製程能力，以穩定品質及專業服務，為客戶創造價值；同時打造良好的工作環境，與員工共同成長，實現企業永續經營。", ja: "加工技術と工程能力を高め、安定した品質と専門的なサービスでお客様に価値を届けます。同時に良い職場環境を整え、社員とともに成長し、持続可能な経営を実現します。", en: "We continuously advance our machining technology and process capabilities to create customer value through stable quality and professional service, while building a better workplace, growing with our employees, and pursuing sustainable operations." },
    },
    service: {
      eyebrow: { zh: "PRECISION MACHINING SERVICES", ja: "PRECISION MACHINING SERVICES", en: "PRECISION MACHINING SERVICES" },
      title: { zh: "專業加工服務", ja: "精密加工サービス", en: "Precision machining services" },
      body: { zh: "從單一研磨加工到完整零件製造，依據客戶圖面、精度及製程需求，提供彈性且完整的加工服務。", ja: "単一の研削加工から完成部品の製造まで、お客様の図面、精度、工程要件に合わせて柔軟で一貫した加工サービスを提供します。", en: "From a single grinding operation to complete part manufacturing, we provide flexible and comprehensive machining services based on each drawing, tolerance, and process requirement." },
      itemTitle: { zh: "整合加工服務", ja: "一貫加工サービス", en: "Integrated processing" },
      itemBody: { zh: "依客戶圖面整合材料準備、車削、銑削、熱處理、表面處理、精密研磨及最終檢驗等製程，提供從材料到成品的一站式加工服務。", ja: "お客様の図面に基づき、材料準備、旋盤、フライス、熱処理、表面処理、精密研削、最終検査までを組み合わせ、材料から完成品まで一貫して対応します。", en: "Based on the customer drawing, we coordinate material preparation, turning, milling, heat treatment, surface treatment, precision grinding, and final inspection for one-stop production from material to finished part." },
      link: { zh: "了解更多", ja: "詳しく見る", en: "Learn more" },
    },
    process: {
      eyebrow: { zh: "SERVICE PROCESS", ja: "SERVICE PROCESS", en: "SERVICE PROCESS" },
      title: { zh: "服務流程", ja: "サービスの流れ", en: "Service process" },
      body: { zh: "從圖面確認、製程規劃到加工、檢驗與出貨，長芸依據客戶需求安排合適製程，確保每一道加工環節穩定銜接。", ja: "図面確認、工程計画から加工、検査、出荷まで、お客様の要望に合わせた工程を組み、各工程を安定してつなぎます。", en: "From drawing review and process planning through machining, inspection, and shipment, Chung Uen arranges the right process for each customer need and keeps every step connected." },
      steps: { zh: "圖面確認 ／ 製程規劃 ／ 加工 ／ 檢驗 ／ 出貨", ja: "図面確認 ／ 工程計画 ／ 加工 ／ 検査 ／ 出荷", en: "DRAWING REVIEW ／ PROCESS PLANNING ／ MACHINING ／ INSPECTION ／ SHIPMENT" },
      link: { zh: "了解更多", ja: "詳しく見る", en: "Learn more" },
    },
  },
  en: {
    values: {
      eyebrow: { zh: "OUR VALUES", ja: "OUR VALUES", en: "OUR VALUES" },
      title: { zh: "核心經營理念", ja: "経営理念", en: "Our values" },
      body: { zh: "長芸秉持穩健經營與持續精進的理念，將品質、客戶需求、生產技術與永續發展落實於每一道製程與服務之中。", ja: "長芸は堅実な経営と継続的な改善を大切にし、品質、お客様の要望、生産技術、持続可能な成長を一つひとつの工程とサービスに反映します。", en: "Chung Uen puts steady management and continuous improvement into practice through quality, customer needs, production technology, and sustainable growth in every process and service." },
      items: [
        { title: { zh: "品質第一", ja: "品質第一", en: "Quality first" }, label: { zh: "QUALITY FIRST", ja: "QUALITY FIRST", en: "QUALITY FIRST" }, body: { zh: "重視每一道加工與檢驗程序，以穩定品質作為長期合作的基礎。", ja: "すべての加工と検査を大切にし、安定した品質を長期的な協力の基盤とします。", en: "We value every machining and inspection step, making stable quality the foundation of long-term partnerships." } },
        { title: { zh: "顧客至上", ja: "お客様第一", en: "Customer first" }, label: { zh: "CUSTOMER FIRST", ja: "CUSTOMER FIRST", en: "CUSTOMER FIRST" }, body: { zh: "以客戶需求為核心，重視溝通、交期與服務，建立長期且值得信賴的合作關係。", ja: "お客様の要望を中心に、コミュニケーション、納期、サービスを大切にし、信頼される長期関係を築きます。", en: "We center every decision on customer needs, communication, delivery, and service to build trusted long-term relationships." } },
        { title: { zh: "卓越生產", ja: "卓越した生産", en: "Manufacturing excellence" }, label: { zh: "MANUFACTURING EXCELLENCE", ja: "MANUFACTURING EXCELLENCE", en: "MANUFACTURING EXCELLENCE" }, body: { zh: "持續提升加工技術、設備能力與製程管理，追求更高的精度、效率與品質穩定性。", ja: "加工技術、設備能力、工程管理を継続的に高め、精度、効率、品質の安定性を追求します。", en: "We continuously improve machining technology, equipment, and process management for greater precision, efficiency, and stability." } },
        { title: { zh: "永續經營", ja: "持続可能な成長", en: "Sustainable growth" }, label: { zh: "SUSTAINABLE GROWTH", ja: "SUSTAINABLE GROWTH", en: "SUSTAINABLE GROWTH" }, body: { zh: "持續投入人才、設備與技術，穩健經營並與客戶及員工共同成長。", ja: "人材、設備、技術への投資を続け、堅実に経営しながらお客様と社員とともに成長します。", en: "We invest in people, equipment, and technology to grow steadily with our customers and employees." } },
      ],
    },
    mission: {
      eyebrow: { zh: "OUR MISSION", ja: "OUR MISSION", en: "OUR MISSION" },
      title: { zh: "我們的目標", ja: "私たちの使命", en: "Our mission" },
      body: { zh: "追求精密、品質與永續，成為客戶值得信賴的精密加工夥伴。", ja: "精度、品質、持続可能性を追求し、お客様に信頼される精密加工パートナーを目指します。", en: "Pursuing precision, quality, and sustainability to become a precision-machining partner our customers can trust." },
      detail: { zh: "持續精進加工技術與製程能力，以穩定品質及專業服務，為客戶創造價值；同時打造良好的工作環境，與員工共同成長，實現企業永續經營。", ja: "加工技術と工程能力を高め、安定した品質と専門的なサービスでお客様に価値を届けます。同時に良い職場環境を整え、社員とともに成長し、持続可能な経営を実現します。", en: "We continuously advance our machining technology and process capabilities to create customer value through stable quality and professional service, while building a better workplace, growing with our employees, and pursuing sustainable operations." },
    },
    service: {
      eyebrow: { zh: "PRECISION MACHINING SERVICES", ja: "PRECISION MACHINING SERVICES", en: "PRECISION MACHINING SERVICES" },
      title: { zh: "專業加工服務", ja: "精密加工サービス", en: "Precision machining services" },
      body: { zh: "從單一研磨加工到完整零件製造，依據客戶圖面、精度及製程需求，提供彈性且完整的加工服務。", ja: "単一の研削加工から完成部品の製造まで、お客様の図面、精度、工程要件に合わせて柔軟で一貫した加工サービスを提供します。", en: "From a single grinding operation to complete part manufacturing, we provide flexible and comprehensive machining services based on each drawing, tolerance, and process requirement." },
      itemTitle: { zh: "整合加工服務", ja: "一貫加工サービス", en: "Integrated processing" },
      itemBody: { zh: "依客戶圖面整合材料準備、車削、銑削、熱處理、表面處理、精密研磨及最終檢驗等製程，提供從材料到成品的一站式加工服務。", ja: "お客様の図面に基づき、材料準備、旋盤、フライス、熱処理、表面処理、精密研削、最終検査までを組み合わせ、材料から完成品まで一貫して対応します。", en: "Based on the customer drawing, we coordinate material preparation, turning, milling, heat treatment, surface treatment, precision grinding, and final inspection for one-stop production from material to finished part." },
      link: { zh: "了解更多", ja: "詳しく見る", en: "Learn more" },
    },
    process: {
      eyebrow: { zh: "SERVICE PROCESS", ja: "SERVICE PROCESS", en: "SERVICE PROCESS" },
      title: { zh: "服務流程", ja: "サービスの流れ", en: "Service process" },
      body: { zh: "從圖面確認、製程規劃到加工、檢驗與出貨，長芸依據客戶需求安排合適製程，確保每一道加工環節穩定銜接。", ja: "図面確認、工程計画から加工、検査、出荷まで、お客様の要望に合わせた工程を組み、各工程を安定してつなぎます。", en: "From drawing review and process planning through machining, inspection, and shipment, Chung Uen arranges the right process for each customer need and keeps every step connected." },
      steps: { zh: "圖面確認 ／ 製程規劃 ／ 加工 ／ 檢驗 ／ 出貨", ja: "図面確認 ／ 工程計画 ／ 加工 ／ 検査 ／ 出荷", en: "DRAWING REVIEW ／ PROCESS PLANNING ／ MACHINING ／ INSPECTION ／ SHIPMENT" },
      link: { zh: "了解更多", ja: "詳しく見る", en: "Learn more" },
    },
  },
};

export const services = [
  {
    number: "01",
    image: "/images/precision-grinding.jpg",
    title: { zh: "精密研磨", ja: "精密研磨", en: "Precision grinding" },
    body: { zh: "內徑、外徑、端面與圓筒研磨，適用於軸件、套筒與高精度圓形零件。", ja: "内径、外径、端面、円筒研磨に対応します。", en: "ID, OD, surface, and cylindrical grinding for precision round parts." },
    tags: { zh: "內徑 / 外徑", ja: "内径 / 外径", en: "ID / OD" },
  },
  {
    number: "02",
    image: "/images/cnc-turning.png",
    title: { zh: "CNC 車削加工", ja: "CNC旋盤加工", en: "CNC turning" },
    body: { zh: "針對軸、套筒與機械零件，提供打樣、小量與穩定量產加工。", ja: "軸、スリーブ、機械部品の試作から量産まで対応します。", en: "Shafts, sleeves, and custom components for prototypes and repeat production." },
    tags: { zh: "V26 / V36", ja: "V26 / V36", en: "V26 / V36" },
  },
  {
    number: "03",
    image: "/images/integrated-processing.png",
    title: { zh: "整合加工服務", ja: "一貫加工サービス", en: "Integrated processing" },
    body: { zh: "從材料、車削、合作加工到研磨與檢驗，整合每一個交付環節。", ja: "材料、旋盤、協力加工、研磨、検査まで一貫管理します。", en: "Coordinate turning, partner processes, grinding, and inspection through one window." },
    tags: { zh: "圖面到成品", ja: "図面から完成品", en: "Drawing to part" },
  },
];

export type ProductionProcessStep = {
  number: string;
  title: TextValue;
  featured?: boolean;
};

export const productionProcessSteps: ProductionProcessStep[] = [
  { number: "01", title: { zh: "圖面確認", ja: "図面確認", en: "Drawing review" } },
  { number: "02", title: { zh: "加工可行性與製程評估", ja: "加工可否と工程評価", en: "Machining feasibility & process evaluation" } },
  { number: "03", title: { zh: "備料", ja: "材料準備", en: "Material preparation" } },
  { number: "04", title: { zh: "車削／銑削加工", ja: "旋削／フライス加工", en: "Turning / milling" } },
  { number: "05", title: { zh: "熱處理", ja: "熱処理", en: "Heat treatment" } },
  { number: "06", title: { zh: "粗研磨加工", ja: "粗研削加工", en: "Rough grinding" } },
  { number: "07", title: { zh: "螺紋及特殊研磨", ja: "ねじ・特殊研削", en: "Threading & special grinding" } },
  { number: "08", title: { zh: "精密內外徑研磨", ja: "精密内外径研削", en: "Precision ID / OD grinding" }, featured: true },
  { number: "09", title: { zh: "最終品質檢驗", ja: "最終品質検査", en: "Final quality inspection" } },
  { number: "10", title: { zh: "防鏽・包裝", ja: "防錆・梱包", en: "Rust prevention & packaging" } },
  { number: "11", title: { zh: "出貨", ja: "出荷", en: "Shipment" } },
];

export const equipmentGroups = [
  { title: { zh: "研磨設備", ja: "研磨設備", en: "Grinding equipment" }, items: [["CNC 圓筒研磨機", "Ø300 × 400L", "SHIGIYA", "4"], ["外徑研磨機", "Ø320 × 1500L", "TOYODA", "3"]] },
  { title: { zh: "車削設備", ja: "旋盤設備", en: "Turning equipment" }, items: [["CNC 車削 V26", "Ø500 × 1100L", "Taiwan", "1"], ["CNC 車削 V36", "Ø550 × 1250L", "Taiwan", "1"]] },
  { title: { zh: "量測設備", ja: "測定設備", en: "Inspection & measurement" }, items: [["表面粗度量測", "Ra 0.01", "Mahr", "1"], ["高度量測儀", "450 × 500", "TESA", "1"]] },
];

export const applications = [
  { code: "01", title: { zh: "機械工具", ja: "工作機械", en: "Machine tools" }, body: { zh: "主軸、套筒與精密軸件", ja: "主軸、スリーブ、精密軸", en: "Spindles, sleeves, and precision shafts" } },
  { code: "02", title: { zh: "汽車零件", ja: "自動車部品", en: "Automotive parts" }, body: { zh: "傳動與精密機構零件", ja: "伝動・精密機構部品", en: "Transmission and precision components" } },
  { code: "03", title: { zh: "工業設備", ja: "産業設備", en: "Industrial machinery" }, body: { zh: "結構與功能性組件", ja: "構造・機能部品", en: "Structural and functional components" } },
  { code: "04", title: { zh: "客製加工", ja: "カスタム加工", en: "Custom production" }, body: { zh: "依圖面製作精密零件", ja: "図面に基づく精密加工", en: "Drawing-based production" } },
];

export const timeline: [string, TextValue][] = [
  ["1998", { zh: "從精密研磨加工起家", ja: "精密研磨加工から開始", en: "Began with precision grinding" }],
  ["2003", { zh: "成立長芸有限公司，服務機械工具產業", ja: "長芸有限公司を設立", en: "Chung Uen established" }],
  ["2004", { zh: "導入日本 CNC 精密研磨設備", ja: "日本製CNC研磨設備を導入", en: "Japanese CNC grinding introduced" }],
  ["NOW", { zh: "持續服務精密製造現場", ja: "精密製造現場を継続支援", en: "Continuing to support precision manufacturing" }],
];

export type AboutTimelineItem = {
  year: string;
  title: TextValue;
  body: TextValue;
};

export const aboutTimeline: AboutTimelineItem[] = [
  {
    year: "1997",
    title: { zh: "春興工業社創立", ja: "春興工業社を創立", en: "Chun Hsing Industrial founded" },
    body: {
      zh: "購入第一批萬能磨床及相關檢驗儀器，正式投入精密研磨加工領域，並隨業務成長持續擴充研磨設備與產能。",
      ja: "最初の万能研削盤と検査機器を導入し、精密研削加工を開始。事業の成長に合わせて設備と生産能力を拡充しました。",
      en: "The first universal grinders and inspection instruments were acquired, establishing our precision-grinding foundation and expanding capacity as demand grew.",
    },
  },
  {
    year: "2001",
    title: { zh: "長芸有限公司成立", ja: "長芸有限公司を設立", en: "Chung Uen Co., Ltd. established" },
    body: {
      zh: "正式成立長芸有限公司，並導入中心孔磨床，進一步拓展精密軸類與機械零件加工能力。",
      ja: "長芸有限公司を正式に設立し、センターホール研削盤を導入。精密シャフトと機械部品の加工能力を広げました。",
      en: "Chung Uen Co., Ltd. was formally established, with center-hole grinding added to expand precision shaft and mechanical-part capabilities.",
    },
  },
  {
    year: "2002–2003",
    title: { zh: "購地建廠・擴大營運規模", ja: "用地取得・新工場建設", en: "Land purchase and new factory" },
    body: {
      zh: "購入乙種工業用地並興建新廠，2003 年正式竣工，進一步強化生產環境與營運基礎。",
      ja: "工業用地を取得して新工場を建設し、2003年に竣工。生産環境と事業基盤を強化しました。",
      en: "Industrial land was acquired and a new factory was built, completing in 2003 to strengthen the production environment and operating foundation.",
    },
  },
  {
    year: "2004",
    title: { zh: "邁向 CNC 精密研磨", ja: "CNC精密研削へ", en: "Moving toward CNC precision grinding" },
    body: {
      zh: "導入 CNC 複合式雙主軸磨床，逐步推動設備 CNC 化，提升加工精度、生產效率與品質穩定性。",
      ja: "CNC複合式両主軸研削盤を導入し、設備のCNC化を進め、精度・効率・品質安定性を高めました。",
      en: "CNC compound twin-spindle grinders were introduced to improve machining accuracy, production efficiency, and quality stability.",
    },
  },
  {
    year: "2006",
    title: { zh: "導入日本 SHIGIYA CNC 圓筒磨床", ja: "日本製SHIGIYA CNC円筒研削盤を導入", en: "Japanese SHIGIYA CNC cylindrical grinder" },
    body: {
      zh: "持續投資高精度研磨設備，進一步提升圓筒研磨加工之精度、效率與製程穩定性。",
      ja: "高精度研削設備への投資を続け、円筒研削の精度・効率・工程安定性をさらに向上させました。",
      en: "Continued investment in high-precision equipment improved cylindrical-grinding accuracy, efficiency, and process stability.",
    },
  },
  {
    year: "2008",
    title: { zh: "升級精密量測與品質管理", ja: "精密測定と品質管理を強化", en: "Upgrading measurement and quality control" },
    body: {
      zh: "重新規劃品管室，導入瑞士 TESA 三次元量測設備，強化尺寸與幾何精度檢測能力。",
      ja: "品質管理室を再整備し、スイスTESAの三次元測定機を導入。寸法と幾何精度の検査能力を強化しました。",
      en: "The quality room was reorganized and Swiss TESA 3D measurement equipment was introduced to strengthen dimensional and geometric inspection.",
    },
  },
  {
    year: "2009",
    title: { zh: "完善表面品質檢測能力", ja: "表面品質検査能力を拡充", en: "Completing surface-quality inspection" },
    body: {
      zh: "導入德國 Mahr 表面粗糙度量測設備，進一步完善精密加工之品質檢驗與管理體系。",
      ja: "ドイツMahrの表面粗さ測定機を導入し、精密加工の品質検査と管理体制をさらに整えました。",
      en: "German Mahr surface-roughness equipment completed the inspection and quality-management system for precision machining.",
    },
  },
];

const aboutGallerySlides = [
  { src: "/images/about-machining-floor.png", alt: "Precision machining floor" },
  { src: "/images/about-factory-wide.png", alt: "Factory machining equipment" },
  { src: "/images/about-exterior.jpg", alt: "Chung Uen company exterior" },
  { src: "/images/about-gallery/7a0bbafa-179d-4bc5-b634-68bfd0fd2911.png", alt: "Precision grinding in production" },
  { src: "/images/about-gallery/15d7d216-9975-41e8-b433-7c054050aa8e.png", alt: "Roller components in the machining shop" },
];

export function AboutGallery({ lang }: { lang: Lang }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = aboutGallerySlides[activeIndex];

  const moveSlide = (direction: number) => {
    setActiveIndex((current) => (current + direction + aboutGallerySlides.length) % aboutGallerySlides.length);
  };

  return <div className="about-gallery" aria-label={lang === "zh" ? "公司照片輪播" : lang === "ja" ? "会社写真スライダー" : "Company photo carousel"} aria-roledescription="carousel"><div className="about-gallery-viewport"><figure className="about-gallery-slide"><img src={activeSlide.src} alt={activeSlide.alt} /></figure></div><div className="about-gallery-controls"><button className="about-gallery-arrow" type="button" aria-label="上一張照片" onClick={() => moveSlide(-1)}><FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /></button><div className="about-gallery-dots" role="tablist" aria-label="照片選擇">{aboutGallerySlides.map((slide, index) => <button key={slide.src} className={index === activeIndex ? "is-active" : ""} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`顯示第 ${index + 1} 張照片`} onClick={() => setActiveIndex(index)} />)}</div><button className="about-gallery-arrow" type="button" aria-label="下一張照片" onClick={() => moveSlide(1)}><FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></button></div></div>;
}

export const text = (value: TextValue, lang: Lang) => value[lang] || value.zh;

export function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="section-intro"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p className="section-lede">{body}</p></div>;
}

type FeatureIconName = "target" | "shield" | "integration" | "handshake";

const featureItems: { icon: FeatureIconName; title: TextValue; body: TextValue }[] = [
  { icon: "target", title: { zh: "高精度加工", ja: "高精度加工", en: "High-precision machining" }, body: { zh: "精密研磨能力可達 μm 等級，滿足高精度零件需求。", ja: "μmレベルの精密研磨で、高精度部品の要求に応えます。", en: "Micron-level grinding for demanding precision parts." } },
  { icon: "shield", title: { zh: "穩定品質", ja: "安定した品質", en: "Stable quality" }, body: { zh: "嚴格的製程管控與檢驗流程，確保每一件產品的品質穩定。", ja: "厳格な工程管理と検査で、品質を安定させます。", en: "Disciplined process control and inspection keep quality consistent." } },
  { icon: "integration", title: { zh: "整合服務", ja: "一貫サービス", en: "Integrated service" }, body: { zh: "從材料到成品，一貫化加工服務，有效提升效率、降低成本。", ja: "材料から完成品まで一貫対応し、効率とコストを改善します。", en: "One accountable path from material to finished part." } },
  { icon: "handshake", title: { zh: "專業信賴", ja: "信頼される専門性", en: "Trusted expertise" }, body: { zh: "多年產業經驗與技術累積，成為客戶長期信賴的合作夥伴。", ja: "長年の経験と技術で、長期的な協力関係を築きます。", en: "Years of experience behind dependable long-term partnerships." } },
];

function FeatureIcon({ name }: { name: FeatureIconName }) {
  const icons = {
    target: { icon: faBullseye, label: "Target icon" },
    shield: { icon: faShieldHalved, label: "Shield icon" },
    integration: { icon: faCircleNodes, label: "Integrated service icon" },
    handshake: { icon: faHandshake, label: "Trust icon" },
  };
  const feature = icons[name];
  return <FontAwesomeIcon icon={feature.icon} aria-label={feature.label} />;
}

function Brand() {
  return <a className="brand" href="#top" aria-label="長芸有限公司首頁"><span className="brand-mark"><img src="/images/chy-logo.png" alt="Chy" /></span><span className="brand-copy"><strong>長芸有限公司</strong><small>CHUNG UEN CO., LTD.</small></span></a>;
}

function OriginalHomeBrand() {
  return <a className="brand" href="#top" aria-label="長芸有限公司首頁"><span className="brand-mark brand-mark-original">Chy</span><span className="brand-copy"><strong>長芸有限公司</strong><small>CHUNG UEN CO., LTD.</small></span></a>;
}

function HomeHeader({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const c = copy[lang];
  return <header className="site-header home-header"><div className="container nav-inner"><OriginalHomeBrand /><nav className="desktop-nav" aria-label="Main navigation">{navItems.map((item, index) => <a key={item.id} className={index === 0 ? "is-active" : ""} href={item.href}>{text(item.label, lang)}</a>)}</nav><div className="header-contact"><div className="language-switcher home-language-switcher" aria-label="Language selector">{([{ key: "zh", label: "中" }, { key: "ja", label: "日" }, { key: "en", label: "EN" }] as const).map((item) => <button key={item.key} type="button" className={lang === item.key ? "is-active" : ""} aria-pressed={lang === item.key} onClick={() => setLang(item.key)}>{item.label}</button>)}</div></div><button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="home-mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><span>{menuOpen ? c.close : c.menu}</span><b><FontAwesomeIcon icon={menuOpen ? faXmark : faBars} aria-hidden="true" /></b></button></div>{menuOpen && <nav id="home-mobile-navigation" className="mobile-nav" aria-label="Mobile navigation"><div className="container">{navItems.map((item) => <a key={item.id} href={item.href} onClick={() => setMenuOpen(false)}>{text(item.label, lang)}</a>)}</div></nav>}</header>;
}

function HomeFooter({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <><ContactCta lang={lang} /><footer className="site-footer"><div className="container footer-main"><div className="footer-company"><h2 className="footer-company-title">長芸有限公司</h2><p>{c.footerDescription}</p></div><div className="footer-contact-section"><h6 className="title"><a href="/contact">{c.footerContact}</a></h6><p><a href="tel:0426763118"><FontAwesomeIcon className="footer-contact-icon" icon={faPhone} aria-hidden="true" />04-26763118</a></p><p><FontAwesomeIcon className="footer-contact-icon" icon={faFax} aria-hidden="true" />04-26763117</p></div><div className="footer-contact footer-address-section"><p><a href="mailto:chunguen851996@gmail.com"><FontAwesomeIcon className="footer-contact-icon" icon={faEnvelope} aria-hidden="true" />chunguen851996@gmail.com</a></p><p className="address-indent"><FontAwesomeIcon className="footer-contact-icon" icon={faLocationDot} aria-hidden="true" /><span>{c.footerAddress}</span></p></div></div><div className="container footer-bottom"><span>© 2026 CHUNG UEN CO., LTD.</span><span>PRECISION GRINDING / TURNING / INSPECTION</span></div></footer></>;
}

function HomeAboutSection({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const content = aboutContent[lang];

  return <section id="about" className="about-section"><div className="container about-layout"><div className="about-copy"><p className="section-eyebrow">{c.aboutEyebrow}</p><h2>{c.aboutTitle}</h2><p>{content.overview}</p><p className="about-detail">{content.detail}</p><details className="about-more"><summary>了解更多 <span aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span></summary><div className="about-more-body">{content.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></details></div><AboutGallery lang={lang} /></div></section>;
}

function HomeBusinessHeading({ lang, number, section }: { lang: Lang; number: string; section: HomeBusinessSection }) {
  return <div className="home-business-heading"><div className="home-business-title"><div className="home-business-marker"><span className="home-business-number">{number}</span><p className="section-eyebrow">{text(section.eyebrow, lang)}</p></div><h2>{text(section.title, lang)}</h2></div><p className="home-business-lede">{text(section.body, lang)}</p></div>;
}

function HomeBusinessSections({ lang }: { lang: Lang }) {
  const content = homeBusinessContent[lang];
  const servicesLabel = text(navItems[1].label, lang);
  const capacityLabel = text(navItems[2].label, lang);
  return <section className="home-business-section"><div className="container home-business-container"><div className="home-business-block home-actions-block"><div className="home-action-grid"><article className="home-action-card"><a className="home-action-image-link" href="/services" aria-label={servicesLabel}><div className="home-action-image"><img src="/images/home-service-card.png" alt={servicesLabel} /><span className="home-action-overlay"><span>{servicesLabel}</span><span className="button-icon" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span></span></div></a></article><article className="home-action-card"><a className="home-action-image-link" href="/capacity" aria-label={capacityLabel}><div className="home-action-image"><img src="/images/home-process-card.jpg" alt={capacityLabel} /><span className="home-action-overlay"><span>{capacityLabel}</span><span className="button-icon" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span></span></div></a></article></div></div></div></section>;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const c = copy[lang];
  return <div id="top" className="site-shell"><HomeHeader lang={lang} setLang={setLang} /><main><section className="hero-section"><div className="hero-media" aria-hidden="true"><img src="/images/hero-component.jpg" alt="" /></div><div className="hero-scrim" aria-hidden="true" /><div className="container hero-content"><p className="hero-kicker">{c.heroEyebrow}</p><h1>{c.heroTitleLead} <em>{c.heroTitleAccent}</em>{c.heroTitleJoin}<br />{c.heroTitleSecond} <em>{c.heroTitleAccent2}</em>{c.heroTitleEnd}</h1><p className="hero-lede">{c.heroBody}</p><div className="hero-services"><span>{c.heroService1}</span><i /><span>{c.heroService2}</span><i /><span>{c.heroService3}</span></div><a className="hero-button" href="/capacity">{c.heroPrimary} <span className="button-icon" aria-hidden="true"><FontAwesomeIcon icon={faArrowRight} /></span></a></div></section><section className="feature-strip"><div className="container feature-grid">{featureItems.map((item) => <article className="feature-item" key={item.icon}><span className="feature-icon"><FeatureIcon name={item.icon} /></span><h2>{text(item.title, lang)}</h2><p>{text(item.body, lang)}</p></article>)}</div></section><HomeAboutSection lang={lang} /><HomeBusinessSections lang={lang} /></main><HomeFooter lang={lang} /></div>;
}
