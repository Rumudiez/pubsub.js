const topics = {};

const nextId = (() => {
  let i = 0;
  return () => i++;
})();

export function subscribe(topic, callback) {
  if (!topics.hasOwnProperty(topic)) {
    topics[topic] = {};
  }

  const id = nextId();

  topics[topic][id] = callback;

  return {
    remove: () => {
      delete topics[topic][id];
    }
  };
}

export function publish(topic) {
  if (topics.hasOwnProperty(topic)) {
    const args = [...arguments].splice(1);
    Object.keys(topics[topic]).forEach(key => 
      topics[topic][key].apply(undefined, args)
    );
  }
}