require("dotenv").config();

const pdfRead = "./Article.pdf";

async function summariseFunction(pdfRead) {
    const { Configuration, OpenAIApi } = require("openai");
    const fs = require("fs");
    const pdfParse = require("pdf-parse");
    const getPDF = async (file) => {
        let readFileSync = fs.readFileSync(file);
        try {
            let pdfExtract = await pdfParse(readFileSync);
            // console.log("File content: ", pdfExtract.text);
            // console.log("Total pages: ", pdfExtract.numpages);
            // console.log("All content: ", pdfExtract.info);
            return pdfExtract;
        } catch (error) {
            throw new Error(error);
        }
    };
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    async function summarise(text) {
        const article = await getPDF(text);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: article.text.substring(0, 15000) + "\n\nTl:dr",
            temperature: 0.7,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 1,
        });

        return [article.info["Title"], response.data.choices[0]["text"]];
    }
    let article_arr = await summarise(pdfRead);
    let summary = article_arr[1].match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
    console.log(article_arr);
    let title = article_arr[0];
    async function present(title, summary) {
        const pptxgen = require("pptxgenjs");
        let pres = new pptxgen();
        let slide = pres.addSlide();
        slide.addText(title, {
            x: "10%",
            y: "50%",
            w: "80%",
            fontSize: 36,
            fill: { color: "ffffff" },
            align: "center",
        });
        const response = await openai.createImage({
            prompt: title,
            n: 1,
            size: "1024x1024",
        });
        let image_url = response.data.data[0].url;
        slide.addImage({
            path: image_url,
        });
        summary.forEach((text) => {
            buildSlide(pres, text);
        });

        pres.writeFile({ fileName: "demo.pptx" });
    }

    function buildSlide(pres, text) {
        let slide = pres.addSlide();

        let textboxText = text;
        let textboxOpts = {
            x: 0,
            y: "50%",
            w: "80%",
            fontSize: 36,
            fill: { color: "ffffff" },
        };

        slide.addText(textboxText, textboxOpts);
    }
    present(title, summary);
}
summariseFunction(pdfRead);
