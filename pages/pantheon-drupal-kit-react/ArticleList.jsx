import Link from "next/link";


const ArticleList = ( { articleList, spanText } ) => {
    //console.log( articleList );
    
    return (
        <div>
            <h5>New List From &apos;ArticleList&apos; Component</h5> 
            <span style={{color: "red"}}>{ spanText } </span>

            <ul>
            {
                articleList.map( (article, index) =>
                    <li key={ index+"getStaticPaths" } >
                        <Link href={ "/pantheon-drupal-kit/"+article.id }><a>{ article.title }</a></Link>
                    </li>
                )
            }
            </ul>

        </div>
     );
}
 
export default ArticleList;