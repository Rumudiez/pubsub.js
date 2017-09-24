const globalTopics = {};

const nextId = (() => {
  let i = 0;
  return () => (i++).toString(16);
})();

export function subscribe(topic, callback) {
  const topics = this && this.pubsub && this.pubsub._topics ? this.pubsub._topics : globalTopics;
  if (!topics.hasOwnProperty(topic)) {
    topics[topic] = {};
  }

  const id = nextId();
  topics[topic][id] = callback;

  return {
    remove: () => delete topics[topic][id]
  };
}

export function publish(topic) {
  const topics = this && this.pubsub && this.pubsub._topics ? this.pubsub._topics : globalTopics;
  if (topics.hasOwnProperty(topic)) {
    const args = [...arguments].splice(1);

    Object.keys(topics[topic]).forEach(key => 
      topics[topic][key].apply(undefined, args)
    );
  }
}

export default function pubsub(root) {
  // Check if any of the properties already exist:
  // 1) Makes this function idempotent
  // 2) Prevents overriding other properties

  if (!root.hasOwnProperty('pubsub')) {
    root.pubsub = {
      _topics: {},
      subscribe: subscribe.bind(root),
      publish: publish.bind(root),
    };
  }
}