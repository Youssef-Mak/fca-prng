import path from 'path';

(async () => {
  if (process.argv.length !== 5) {
    console.error('Usage: yarn run generate <ECA|FCA> <rule_number> <number_of_iterations>');
    process.exit(1);
  }

  const caNameOriginal = process.argv[2];
  const rule_number = process.argv[3];
  const number_of_iterations = process.argv[4];

  const caPath = path.join(__dirname + "/CA", caNameOriginal);
  console.log(`Running ${caNameOriginal}`);

  const cellular_automata = await import(caPath).catch((_e) => {
    console.error(`Cellular Automata ${caNameOriginal} definition not found.`);
    process.exit(1);
  });

  const task = cellular_automata.default;

  console.log(`Running ${caNameOriginal}.generate`);

  const number_generated = task.generate(rule_number, 60, number_of_iterations);

  console.log(`\n\n\nNumber Generated... -> ${number_generated}`);
})();
