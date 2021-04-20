const gremlin = require('gremlin')
import Post from './Post'
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection
const Graph = gremlin.structure.Graphdeclare
 var process: {
    env: {
        NEPTUNE_ENDPOINT: string
    }
}
async function createPost(post: Post) {
    let dc = new DriverRemoteConnection('wss://'+process.env.NEPTUNE_ENDPOINT+':8182/gremlin:8182/gremlin', {})
    const graph = new Graph()
    const g = graph.traversal().withRemote(dc)

    await g.addV('posts').property('title',post.title).property('content', post.content).next()
    dc.close()
    console.log(post)
    return post
}
export default createPost