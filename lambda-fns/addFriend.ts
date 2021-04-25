import { driver, process as gprocess } from 'gremlin';
import Person from './Person';
declare var process: {
    env: {
        NEPTUNE_ENDPOINT: string
    }
}
export default async function addFriend(Person1Name: string, Person2Name: string) {
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
    const __ = gprocess.statics;

    let result = await g.V().has('person', 'PersonName', Person1Name).addE('friend').
        to(__.V().has('person', 'PersonName', Person2Name)).toList();
    return 'Addes Sucessfully';









}
