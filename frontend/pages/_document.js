import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <base href="/" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="assets/css/uikit.min.css" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;800&family=Quicksand:wght@500;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />

                    <script src="assets/js/uikit.min.js"></script>
	                <script src="assets/js/uikit-icons.min.js"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument;