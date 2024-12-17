import { KafkaClient, Consumer, Producer, Admin } from 'kafka-node';

const kafkaClient = new KafkaClient({ kafkaHost: 'kafka:9093' });
// Create Admin for creating topics
const admin = new Admin(kafkaClient);

// Topic configuration
const topic = {
  topic: 'orders',
  partitions: 1,
  replicationFactor: 1
};

// Create the topic
admin.createTopics([topic], (error, result) => {
  if (error) {
    console.error('Error creating topic:', error);
  } else {
    console.log('Topic created successfully:', result);
  }
});
const producer = new Producer(kafkaClient);
const consumer = new Consumer(
  kafkaClient,
  [{ topic: 'orders', partition: 0 }],
  { autoCommit: true }
);

export { producer, consumer };
