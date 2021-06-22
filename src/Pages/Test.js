import React , {Component} from 'react';

class Test extends Component {
    render() {
        return super.render(
            <div>
                <span><sub>Author {post.author_id} .  posted in : {post.created_at} </sub></span>
                <div> {post.description} </div>
            </div>


        );
    }
}
export default Test;
