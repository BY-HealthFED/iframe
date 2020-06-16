// ========================
const host = new Host();

host
  .on('ready', (channel) => {
    // TODO...
  })
  .on('error', (err) => {
    // TODO...
  })
  .open();

// ========================
const client = new Client();
client
  .on('ready', (channel) => {
    // TODO...
  })
  .on('error', (err) => {
    // TODO...
  })
  .connect();

try {
  const channel1 = await client.connect();
  const channel2 = await client.connect();

  await channel1.send('hello world');
} catch (error) {
  // TODO
}
