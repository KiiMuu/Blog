import { useState, Fragment } from 'react';
import Link from 'next/link';
import { blogsSearch } from '../../actions/blog';
import './blog.scss';

const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    const handleChange = e => {
        setValues({
            ...values,
            search: e.target.value,
            searched: false,
            results: []
        });
    }

    const handleSearch = e => {
        e.preventDefault();

        blogsSearch({ search }).then(data => {
            setValues({
                ...values,
                searched: true,
                results: data,
                message: `${data.length} blogs found`
            });
        });
    }

    const searchedBlogs = (results = []) => {
        return (
            <div className="searched_blogs-content">
                {message && <p>{message}</p>}

                {results.map((blog, i) => (
                    <div className="blogs" key={i}>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a>{blog.title}</a>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }

    const searchForm = () => (
        <form onSubmit={handleSearch}>
            <div className="uk-grid-small" data-uk-grid>
                <div className="uk-width-1-1">
                    <div className="input-field">
                        <input 
                            type="text"
                            placeholder="Search for Blogs?"
                            value={search}
                            onChange={handleChange} 
                        />
                        <button type="submit">Search</button>
                    </div>
                </div>
            </div>
        </form>
    )

    return (
        <Fragment>
            {searchForm()}
            {searched && <div>{searchedBlogs(results)}</div>}
        </Fragment>
    )
}

export default Search;