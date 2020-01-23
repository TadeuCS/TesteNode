const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                dabase_url : 'mongodb+srv://usuario_admin:mutkch@clusterapi-g2i3s.mongodb.net/test?retryWrites=true&w=majority',
                jwt_private : 'batatafrita2019',
                time_expirate: '1H'
            }
        case 'hml':
            return {
                dabase_url : 'mongodb+srv://usuario_admin:mutkch@clusterapi-g2i3s.mongodb.net/test?retryWrites=true&w=majority',
                jwt_private : 'batatafrita2019',
                time_expirate: '6H'
            }
        case 'prod':
            return {
                dabase_url : 'mongodb+srv://usuario_admin:mutkch@clusterapi-g2i3s.mongodb.net/test?retryWrites=true&w=majority',
                jwt_private : 'batatafrita2019',
                time_expirate: '1d'
            }
    }
}
console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();