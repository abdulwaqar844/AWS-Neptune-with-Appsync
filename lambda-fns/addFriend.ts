import { driver, process as gprocess } from 'gremlin';
import Person from './Person';
declare var process: {
    env: {
        NEPTUNE_ENDPOINT: string
    }
}
export default async function addFriend(person1ID: string, Person2ID: string) {
    let conn: driver.DriverRemoteConnection;
    let g: gprocess.GraphTraversalSource;
    const getConnectionDetails = () => {
        const database_url = 'wss://' + process.env.NEPTUNE_ENDPOINT + ':8182/gremlin';
        return { url: database_url, headers: {} };
    };

    const createRemoteConnection = () => {
        const { url, headers } = getConnectionDetails();
        return new driver.DriverRemoteConnection(
            url,
            {
                mimeType: 'application/vnd.gremlin-v2.0+json',
                pingEnabled: false,
                headers: headers
            });
    };
    const createGraphTraversalSource = (conn: driver.DriverRemoteConnection) => {
        return gprocess.traversal().withRemote(conn);
    };
    if (conn == null) {
        conn = createRemoteConnection();
        g = createGraphTraversalSource(conn);
    }
    // console.log('IDs recieved',person1ID, Person2ID)
    // let result = await g.V().has('person', 'id', person1ID).addE('friend').
    //     to(`V().has('person', 'id', ${Person2ID})`).
    //     next();
    const __ = gprocess.statics;

    let result = await g.V().has('person', 'id', person1ID).addE('friend').
        to(__.V().has('person', 'id', Person2ID)).
        next();
    console.log(result)
    return result.value.id;









}
