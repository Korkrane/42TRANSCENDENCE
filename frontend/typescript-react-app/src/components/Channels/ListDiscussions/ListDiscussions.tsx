import './ListDiscussions.scss';
import SingleMessage from "./SingleMessage/SingleMessage";

export default function ListDiscussions() {
    //var list = this.
    return (
        <div id="ListDiscussions">
            <p id="discussions--title">List of messages</p>
            <div className="overflow-auto" id="sub--div">
                <ul id="messages">
                    {/*<SingleMessage username="malatini" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta illo inventore magni neque omnis ratione iure, in nesciunt, doloribus mollitia, deleniti officiis iusto tempora ad laborum quibusdam earum accusantium blanditiis." />*/}
                </ul>  
            </div>
        </div>
    );
}
