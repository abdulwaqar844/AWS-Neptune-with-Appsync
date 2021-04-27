import { driver, process as gprocess } from 'gremlin';
import  ReviewInput  from './Review'
declare var process: {
    env: {
        NEPTUNE_ENDPOINT: string
    }
}
export default async function addReview(reviewInput: ReviewInput) {
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


    let result = await g.addE('writes').from_(__.V().
    has('person', 'PersonID', reviewInput.PersonID)).
    to
    (__.addV('Review').property('ReviewID', reviewInput.ReviewID).
        property('ReviewText', reviewInput.ReviewText).
        property('ReviewDate', reviewInput.ReviewDate).
        property('ReviewRating', reviewInput.ReviewRating)).
    addE('about').
    from_(__.V().has('Review', 'ReviewID',reviewInput.ReviewID)).to(__.V().
        has('resturent', 'name', reviewInput.RestaurantID)).toList();
    return 'Review Added Sucessfully';









}
