import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroeById } from '../../selectors/getHeroById';

export const HeroScreen = ({history}) => {

    const { heroId } = useParams();

    const hero = useMemo(() => getHeroeById(heroId), [heroId]);

    if (!hero) {
        return <Redirect to="/" />
    }

    const handleReturn = () => {

        if(history.length <= 2) {
            history.push('/')
        } else {
            history.goBack();
        }
    }

    const {
        superhero,
        publisher,
        alter_ego,
        characters,
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-md-4">
                <img
                    src={`../assets/heroes/${heroId}.jpg`}
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                    alt={superhero}
                />
            </div>
            <div className="col-md-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego:</b> { alter_ego } </li>
                    <li className="list-group-item"><b>Publisher:</b> { publisher } </li>
                    <li className="list-group-item"><b>First Appearance:</b> { alter_ego } </li>
                </ul>
                <h5>Caracters</h5>
                <p>{characters}</p>

                <button
                    className="btn btn-outline-info"
                    onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
