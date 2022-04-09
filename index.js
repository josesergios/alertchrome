const Spawn = require('child_process').spawn;
const CDP = require('chrome-remote-interface');

async function example() {
    let client;
    try {
        // connect to endpoint
        client = await CDP();
        // extract domains
        const {Network, Page} = client;
        // setup handlers
        Network.requestWillBeSent((params) => {
            console.log(params.request.url);
        });
        // enable events then start!
        await Network.enable();
        await Page.enable();
        await Page.navigate({url: 'https://whatsapp.com'});
        await Page.loadEventFired();

        await Runline.evaluate({expression: 'alert("Mensagem de teste");'})
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

const browserProcess = Spawn('google-chrome', [
    // '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--remote-debugging-port=9222',
    '--remote-debugging-address=0.0.0.0',
    '--user-data-dir=data',
    '--no-first-run',
    '--disable-popup-blocking',
    '--disable-infobars',
    '--start-maximized',
    '--use-fake-device-for-media-stream',
    '--mute-audio',
    '--ignore-certificate-errors',
    ]);

    browserProcess.on('close', code => {
        console.log('Browser closed!');
    });

    
    setTimeout(async () => {
        await example();
        res.send("Solicitação realizada com sucesso");
    }, 2000)
