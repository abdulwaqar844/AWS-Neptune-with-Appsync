const gremlin = require('gremlin')
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection
const Graph = gremlin.structure.Graph
var uri = process.env.NEPTUNE_ENDPOINT
import Post from './Post';
export default async function createPost(post: Post) {
    let dc = new DriverRemoteConnection(`wss://${uri}:8182/gremlin`, {})
    const graph = new Graph()
      const g = graph.traversal().withRemote(dc)

    let result = await g.addV('posts').property('title', post.title).property('content', post.content).next();
    console.log('Post', post, 'Result', result);
    post.id = result.value.id
    return post;
    

    






}
