const prod = {
    url: {
        BASE_URL: 'https://langgenie-backend-latest.onrender.com'
    }

}

const dev = {
    url: {
        BASE_URL: 'http://localhost:8000'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;