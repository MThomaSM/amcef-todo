import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-dark" style={{position: 'fixed', width: '100%', bottom: 0}}>
            <Container>
                <span className="text-white">© {new Date().getFullYear()} - Tomáš Magnes</span>
            </Container>
        </footer>
    );
}

export default Footer;
