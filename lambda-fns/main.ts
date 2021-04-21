import createPost from './createPost';
import listPosts from './listPosts';
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
      return  console.log('Event Recieved',event)
      //await createPost(event.arguments.post);
    case "listPosts":
      return console.log('Event Recieved',event)
      //await listPosts();
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

// export async function handler(post: Post) {
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

// return (
//     
//        


//     doQuery);
// }
