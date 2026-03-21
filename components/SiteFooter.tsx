import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo-mark">EJP</div>
          <span>Employment &amp; Job Placement</span>
        </div>
        <ul className="footer-links">
          <li><a href="#">1199SEIU Funds</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Accessibility</a></li>
          <li><Link href="/admin">Admin</Link></li>
        </ul>
      </div>
      <div className="footer-bottom">
        &copy; 2026 1199SEIU Training &amp; Employment Funds. All rights reserved.
      </div>
    </footer>
  );
}
