const Influx = require('influx');

 const influx = new Influx.InfluxDB({
  host: 'localhost',
  port: 8086,
  database: 'mydb',
  schema: [
    {
      measurement: 'moisture',
      fields: {
        value: Influx.FieldType.FLOAT,
      },
      tags: [
        'sensor_id'
      ]
    }
  ]
});
