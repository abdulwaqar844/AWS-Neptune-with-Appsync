import Post from './Post'
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { driver, process as gprocess, structure } from 'gremlin';
import * as async from 'async';
declare var process: {
    env: {
        NEPTUNE_ENDPOINT: string
    }
}
let conn: driver.DriverRemoteConnection;
let g: gprocess.GraphTraversalSource;

async function query(post) {
    return g.addV('posts').property('title', post.title).property('content', post.content).next();
}

async function doQuery(post) {
    await query(post);
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: post,
    };

}
export async function createPost(post: Post) {
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
    return doQuery(post)
    

}
// const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection
// const Graph = gremlin.structure.Graph
// declare var process : {
//     env: {
//       NEPTUNE_ENDPOINT: string
//     }
//   }
// async function createPost( {
//     let dc = new DriverRemoteConnection
//     (`wss:// + ${process.env.NEPTUNE_ENDPOINT} +:8182/gremlin`,
//      {})
//     const graph = new Graph()
//     const g = graph.traversal().withRemote(dc)

//     await 
//     dc.close()
//     return post
// }
// export default createPost