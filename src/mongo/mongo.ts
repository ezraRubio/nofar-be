import { MongoClient, Db } from 'mongodb';

const listEntry = "listEntry";

export class Mongo {
    public static client: MongoClient;
    public static db: Db;

    public static connect = (uri: string): Promise<Db> => 
        MongoClient.connect(uri, { ignoreUndefined: true })
            .then(client => Mongo.client = client)
            .then(client => Mongo.db = client.db())
    
    public static collection = <T>(name: string) => Mongo.db.collection<T>(name);

    public static mailingList = () => Mongo.collection(listEntry);
}