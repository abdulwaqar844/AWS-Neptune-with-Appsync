const gremlin = require('gremlin')
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection
const Graph = gremlin.structure.Graph
var process: {
    env: {
        NEPTUNE_ENDPOINT: string
    }
}
const listPosts = async () => {
    let dc = new DriverRemoteConnection('wss://'+process.env.NEPTUNE_ENDPOINT+':8182/gremlin:8182/gremlin', {})
    const graph = new Graph()
    const g = graph.traversal().withRemote(dc)
    try {
      let data = await g.V().hasLabel('posts').toList()
      let posts = Array()

      for (const v of data) {
        const _properties = await g.V(v.id).properties().toList()
        let post = _properties.reduce((acc, next) => {
          acc[next.label] = next.value
          return acc
        }, {})
        post.id = v.id
        posts.push(post)
      }
                
      dc.close()
      console.log(posts)
      return posts
    } catch (err) {
        console.log('ERROR', err)
        return null
    }
}

export default listPosts