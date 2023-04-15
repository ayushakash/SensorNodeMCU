const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());


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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/sendData', (req, res) => {
    const data = [
        {
            measurement: 'moisture',
            tags: { sensor_id: req.body.sensor_id },
            fields: { value: req.body.moisture }
        }
    ];

    influx.writePoints(data)
        .then(() => {
            console.log('Data saved successfully', req.body);
            res.send('Data received!');
        })
        .catch(err => {
            console.error(`Error saving data to InfluxDB! ${err.stack}`);
            res.status(500).send('Error saving data to InfluxDB!');
        });
});

app.get('/api/getData', (req, res) => {
    influx.query('SELECT  Last(*) FROM moisture')
        .then(result => {
            console.log('Data retrieved successfully');
            res.json(result);
        })
        .catch(err => {
            console.error(`Error retrieving data from InfluxDB! ${err.stack}`);
            res.status(500).send('Error retrieving data from InfluxDB!');
        });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


// to query select * from moisture