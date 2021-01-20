import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import queryString from 'query-string';

import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [formValues, handledInputChange] = useForm({
        search: q
    });

    const { search } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${search}`);
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            name="search"
                            value={search}
                            onChange={handledInputChange}
                        />
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>

                    {
                        (q === '') &&
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0) &&
                            <div className="alert alert-danger">
                                There is no hero with {q}
                            </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
