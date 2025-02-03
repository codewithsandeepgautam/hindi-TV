import React from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { useLanguage } from "../utils/LanguageContext";
import SEO from "../components/common/Seo";
const Disclaimer = () => {
    const { changeLanguage, language, translate } = useLanguage()

    return (
        <>
        <SEO title="Disclaimer - My Hindi TV" description="My Hindi TV के डिस्क्लेमर को पढ़ें। वेबसाइट के उपयोग और शर्तों के बारे में जानें।"/>
            <Navbar changeLanguage={changeLanguage} currentLanguage={language} />
            <section className="padd NewsReleases">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="mb-3 text-black">{translate("footerDisclaimer")}</h2>
                            <div className="list-group">
                                {language === "en" ? (content.map((item, index) => (
                                    <div key={index} className="p-2">
                                        <h5 className="subtitleslevel pb-2 headingItems">{item.heading}</h5>
                                        <p className="pb-2">{item.text}</p>
                                    </div>
                                ))) : (contentPn.map((item, index) => (
                                    <div key={index} className="p-2">
                                        <h5 className="subtitleslevel pb-2 headingItems">{item.heading}</h5>
                                        <p className="pb-2">{item.text}</p>
                                    </div>
                                ))
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};
const content = [

    {
        heading: "News",
        text: "The News section of the Web Site may contain news and other articles that have been sourced from newspapers, magazines and third party web sites. The sources of all such articles have been named and clearly indicated in appropriate places. Except for rights that have been expressly granted to eMudhra by the respective authors/ publishers of such articles, eMudhra does not claim any other rights in such articles, including copyrights and other intellectual property rights. Such articles have been published on the Web Site for information purposes only and eMudhra disclaims any and all liability in connection therewith."
    },
    {
        heading: "Other Contents",
        text: "The other contents included on the Web Site, including but not limited to text, graphics, logos, button icons, images, audio clips, trademarks, service marks, domain names, designs, software etc., are the properties of eMudhra or its content providers and protected by Indian and international intellectual property laws."
    },
    {
        heading: "Cookies",
        text: "To personalize your experience on our website, we may assign your computer browser a unique random number called a cookie. Cookies enhance website performance in important ways like personalizing your experience, or making your visit more convenient. eMudhra or its affiliates or vendors may use this data to analyze trends and statistics and keep track of the domains from which people visit and also measure visitor activity one eMudhra Limited web sites, but in doing so eMudhra shall keep the information anonymous. If you do not want your transaction details used in this manner, you can either disable your cookies or opt-out at the download or request page."
    },
    {
        heading: "Legal Disclaimers",
        text: "eMudhra has not reviewed any or all of the web sites linked to its Web Site and is not responsible for the content of any off-site pages or any other web sites linked to the Web Site. Please understand that any non eMudhra web site is independent from eMudhra and eMudhra has no control over the content on that web site. In addition, a link to a non - eMudhra web site does not mean that eMudhra endorses or accepts any responsibility for the content, or the use, of such site. It is the user's responsibility to take precautions to ensure that whatever is selected is free of such items as viruses, worms, Trojan horses and other items of a destructive nature."
    },
    {
        heading: "Indenity",
        text: "You agree to defend, indenify, and hold harmless eMudhra and or its associate entities, their officers, directors, employees and agents, from and against any claims, actions or demands, including without limitation reasonable legal and accounting fees, alleging or resulting from your use of the web site material or your breach of these Terms and Conditions of Web site use."
    },
];
const contentPn = [
    {
        heading: "समाचार",
        text: "वेब साइट के समाचार अनुभाग में समाचार और अन्य लेख शामिल हो सकते हैं जो समाचार पत्रों, पत्रिकाओं और तीसरे पक्ष की वेब साइटों से प्राप्त किए गए हैं। ऐसे सभी लेखों के स्रोतों का नाम दिया गया है और उचित स्थानों पर स्पष्ट रूप से दर्शाया गया है। ऐसे लेखों के संबंधित लेखकों/प्रकाशकों द्वारा eMudhra को स्पष्ट रूप से दिए गए अधिकारों को छोड़कर, eMudhra ऐसे लेखों में कॉपीराइट और अन्य बौद्धिक संपदा अधिकारों सहित किसी भी अन्य अधिकार का दावा नहीं करता है। ऐसे लेख केवल सूचना प्रयोजनों के लिए वेब साइट पर प्रकाशित किए गए हैं और eMudhra उनके संबंध में किसी भी और सभी दायित्व को अस्वीकार करता है।"
    },
    {
        heading: "अन्य सामग्री",
        text: "वेब साइट पर शामिल अन्य सामग्री, जिसमें टेक्स्ट, ग्राफिक्स, लोगो, बटन आइकन, छवियां, ऑडियो क्लिप, ट्रेडमार्क, सेवा चिह्न, डोमेन नाम, डिज़ाइन, सॉफ़्टवेयर इत्यादि शामिल हैं, लेकिन इन्हीं तक सीमित नहीं हैं, eMudhra या इसकी सामग्री के गुण हैं प्रदाता और भारतीय और अंतर्राष्ट्रीय बौद्धिक संपदा कानूनों द्वारा संरक्षित।"
    },
    {
        heading: "कुकीज़",
        text: "हमारी वेबसाइट पर आपके अनुभव को निजीकृत करने के लिए, हम आपके कंप्यूटर ब्राउज़र को एक अद्वितीय यादृच्छिक संख्या निर्दिष्ट कर सकते हैं जिसे कुकी कहा जाता है। कुकीज़ आपके अनुभव को वैयक्तिकृत करने, या आपकी यात्रा को अधिक सुविधाजनक बनाने जैसे महत्वपूर्ण तरीकों से वेबसाइट के प्रदर्शन को बढ़ाती हैं। eMudhra या उसके सहयोगी या विक्रेता इस डेटा का उपयोग रुझानों और आंकड़ों का विश्लेषण करने और उन डोमेन पर नज़र रखने के लिए कर सकते हैं जिनसे लोग आते हैं और eMudhra लिमिटेड वेब साइटों पर विज़िटर गतिविधि को मापते हैं, लेकिन ऐसा करने में eMudhra जानकारी को गुमनाम रखेगा। यदि आप नहीं चाहते कि आपके लेनदेन विवरण का इस प्रकार उपयोग किया जाए, तो आप या तो अपनी कुकीज़ अक्षम कर सकते हैं या डाउनलोड या अनुरोध पृष्ठ पर ऑप्ट-आउट कर सकते हैं।"
    },
    {
        heading: "कानूनी अस्वीकरण",
        text: "eMudhra ने अपनी वेब साइट से जुड़ी किसी भी या सभी वेब साइटों की समीक्षा नहीं की है और वह किसी भी ऑफ-साइट पेज या वेब साइट से जुड़ी किसी अन्य वेब साइट की सामग्री के लिए जिम्मेदार नहीं है। कृपया समझें कि कोई भी गैर eMudhra वेब साइट eMudhra से स्वतंत्र है और eMudhra का उस वेब साइट की सामग्री पर कोई नियंत्रण नहीं है। इसके अलावा, किसी गैर-eMudhra वेब साइट के लिंक का मतलब यह नहीं है कि eMudhra ऐसी साइट की सामग्री, या उपयोग के लिए किसी जिम्मेदारी का समर्थन करता है या स्वीकार करता है। यह सुनिश्चित करने के लिए सावधानी बरतना उपयोगकर्ता की ज़िम्मेदारी है कि जो कुछ भी चुना गया है वह वायरस, कीड़े, ट्रोजन हॉर्स और विनाशकारी प्रकृति की अन्य वस्तुओं जैसी वस्तुओं से मुक्त है।"
    },
    {
        heading: "हानि से सुरक्षा",
        text: "आप eMudhra और या इसकी सहयोगी संस्थाओं, उनके अधिकारियों, निदेशकों, कर्मचारियों और एजेंटों को बिना किसी सीमा के उचित कानूनी और लेखा शुल्क सहित किसी भी दावे, कार्रवाई या मांग से बचाव, निंदा करने और हानिरहित रखने के लिए सहमत हैं, आरोप लगा रहे हैं या उसके परिणामस्वरूप आपके द्वारा वेब साइट सामग्री का उपयोग या वेब साइट उपयोग के इन नियमों और शर्तों का उल्लंघन।"
    }
]

export default Disclaimer;

