const rxdb = require("rxdb");
const pouchAdapter = require("pouchdb-adapter-leveldb");
const leveldown = require("leveldown");

class DatabaseInterface {
  constructor(path) {
    this.initDB(path);
  }

  async initDB(path) {
    rxdb.addRxPlugin(pouchAdapter);
    this.db = await rxdb.createRxDatabase({
      name: path,
      adapter: leveldown,
    });

    this.itemSchema = {
      title: "item schema",
      version: 0,
      type: "object",
      properties: {
        category: {
          type: "string",
        },
        title: {
          type: "string",
        },
      },
    };

    this.entriesCollection = await this.db.addCollections({
      items: {
        schema: this.itemSchema,
      },
    });
  }

  async addEntry(entry) {
    this.db.items.insert(entry);
  }

  async readAllEntries() {
    let entries = await this.db.items.find().exec();

    entries = entries.map((entry) => entry.toJSON());

    const entriesPerCategory = [];

    entries.forEach((entry) => {
      if (entriesPerCategory[entry.category]) {
        entriesPerCategory[entry.category].push(entry);
      } else {
        entriesPerCategory[entry.category] = [entry];
      }
    });

    return entriesPerCategory;
  }

  async readEntry(id) {
    let entry = await this.db.items.findOne().where("_id").eq(id).exec();

    entry = entry.toJSON();

    return entry;
  }

  async removeEntry(id) {
    const query = await this.db.items.findOne().where("_id").eq(id);
    await query.remove();
  }

  async updateEntry(updatedEntry) {
    const entry = await this.db.items
      .findOne()
      .where("_id")
      .eq(updatedEntry._id)
      .exec();

    await entry.update({
      $set: updatedEntry,
    });

    return entry;
  }
}

module.exports = DatabaseInterface;
