import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import {driver, process as gprocess, structure} from 'gremlin';
import * as async from 'async';
import {createPost} from './createPost';
import {listPosts} from './listPosts';
import Post from './Post';

type AppSyncEvent = {
  info: {
    fieldName: string
  },
  arguments: {
    post: Post
  }
}

exports.handler = async (event:AppSyncEvent) => {
  switch (event.info.fieldName) {
    case "createPost":
      return await createPost(event.arguments.post);
    case "listPosts":
      return await listPosts();
    default:
      return null;
  }
}
// 
// let conn: driver.DriverRemoteConnection;
// let g: gprocess.GraphTraversalSource;

// async function query() {
//     return g.addV('Post').property('Name','First Post').next()
// }
// async function doQuery() {
//     let result = await query(); 
//     console.log('Record added',result)
//     return {
//         statusCode: 200,
//         headers: { "Content-Type": "text/plain" },
//         body: result["value"],
//       };
// }

// export async function handler(event: APIGatewayProxyEvent, context: Context) {
//     const getConnectionDetails = () => {
//         const database_url = 'wss://' + process.env.NEPTUNE_ENDPOINT + ':8182/gremlin';
//         return { url: database_url, headers: {}};
//     };

//     const createRemoteConnection = () => {
//         const { url, headers } = getConnectionDetails();

//         return new driver.DriverRemoteConnection(
//             url, 
//             { 
//                 mimeType: 'application/vnd.gremlin-v2.0+json', 
//                 pingEnabled: false,
//                 headers: headers 
//             });       
//     };

//     const createGraphTraversalSource = (conn: driver.DriverRemoteConnection) => {
//         return gprocess.traversal().withRemote(conn);
//     };

//     if (conn == null){
//         conn = createRemoteConnection();
//         g = createGraphTraversalSource(conn);
//     }

// return async.retry(
//     { 
//         times: 5,
//         interval: 1000,
//         errorFilter: function (err) { 
            
//             // Add filters here to determine whether error can be retried
//             console.warn('Determining whether retriable error: ' + err.message);
            
//             // Check for connection issues
//             if (err.message.startsWith('WebSocket is not open')){
//                 console.warn('Reopening connection');
//                 conn.close();
//                 conn = createRemoteConnection();
//                 g = createGraphTraversalSource(conn);
//                 return true;
//             }
            
//             // Check for ConcurrentModificationException
//             if (err.message.includes('ConcurrentModificationException')){
//                 console.warn('Retrying query because of ConcurrentModificationException');
//                 return true;
//             }
            
//             // Check for ReadOnlyViolationException
//             if (err.message.includes('ReadOnlyViolationException')){
//                 console.warn('Retrying query because of ReadOnlyViolationException');
//                 return true;
//             }
            
//             return false; 
//         }        
//     }, 
//     doQuery);
// }
