import React from 'react';

const about = () => (
    <>  
        <div className="about">
            <img src="/static/platzi-logo.png" alt=""/>
            <h2>Creada por Ivan Hernandez</h2>
            <p>Curso de Next.js de Platzi</p>
        </div>        

        <style jsx>{`
            .about {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items center;
                margin-top: 10%;
            }
                        
            img {
                max-width: 30%;
                display: block;
                margin: 0 auto;
            }
        `}</style>

            <style jsx global>{`
            * {
                color: white;
            }
            
            body {
                background: #22495f;
            }
            `}</style>
    </>
)

export default about;