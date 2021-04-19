const gremlin = require('gremlin')
import Post from './Post'

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection
const Graph = gremlin.structure.Graph
declare var process : {
    env: {
      NEPTUNE_ENDPOINT: string
    }
  }
async function createPost(post: Post) {
    let dc = new DriverRemoteConnection(`wss://${process.env.NEPTUNE_ENDPOINT}/gremlin`, {})
    const graph = new Graph()
    const g = graph.traversal().withRemote(dc)

    await g.addV('posts').property('title',post.title).property('content', post.content).next()
    dc.close()
    return post
}
export default createPost