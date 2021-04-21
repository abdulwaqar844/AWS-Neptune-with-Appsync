import { driver, process as gprocess, structure } from 'gremlin';
import Post from './Post';
declare var process: {
    env: {
        NEPTUNE_ENDPOINT: string
    }
}


export default async function createPost(post: Post) {
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


    let result= await g.addV('posts').property('id', post.id).property('title', post.title).property('content', post.content).next();
     console.log('Post',post,'Result',result);
     return {
        
        body: post ,

    }






}
