import React from "react";
import "../styles/TermsAndConditions.css"; // Import your CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-heading">Terms and Conditions</h1>

      <div className="main-sections-container">
        {/* Terms Section */}
        <section className="terms-section">
          <h2>Terms</h2>
          <p>
            Welcome to [Your Company Name]. These Terms and Conditions govern
            your use of our website located at [Your Website URL] and any
            related services. By accessing or using our website, you agree to be
            bound by these Terms and Conditions. If you do not agree to these
            terms, please do not use our website.
          </p>

          <p>
            We reserve the right to modify these Terms and Conditions at any
            time. Any changes will be posted on this page, and it is your
            responsibility to review these terms periodically. Continued use of
            our website after any changes constitutes your acceptance of the new
            terms.
          </p>
        </section>

        {/* Conditions Section */}
        <section className="conditions-section">
          <h2>Conditions</h2>
          <div className="conditions-container">
            <div className="condition-item">
              <h3>Use of Our Website</h3>
              <p>
                You agree to use our website only for lawful purposes and in
                accordance with these Terms and Conditions. You may not use our
                website:
              </p>
              <ul>
                <li>
                  In any way that violates any applicable local, national, or
                  international law or regulation.
                </li>
                <li>
                  For the purpose of exploiting, harming, or attempting to
                  exploit or harm others.
                </li>
                <li>
                  To send, knowingly receive, upload, download, use, or re-use
                  any material that does not comply with our content standards.
                </li>
              </ul>
            </div>
            <div className="condition-item">
              <h3>Intellectual Property Rights</h3>
              <p>
                All content, trademarks, and other intellectual property on our
                website are owned by or licensed to [Your Company Name]. You may
                not reproduce, distribute, or create derivative works from any
                content on our website without our prior written consent.
              </p>
            </div>
            <div className="condition-item">
              <h3>User Content</h3>
              <p>
                You are responsible for any content you post on our website,
                including text, images, and other material. By posting content,
                you grant us a worldwide, non-exclusive, royalty-free license to
                use, reproduce, and display your content.
              </p>
            </div>
            <div className="condition-item">
              <h3>Third-Party Links</h3>
              <p>
                Our website may contain links to third-party websites that are
                not owned or controlled by [Your Company Name]. We are not
                responsible for the content or practices of any third-party
                websites. You should review the terms and conditions and privacy
                policies of any third-party websites you visit.
              </p>
            </div>
            <div className="condition-item">
              <h3>Limitation of Liability</h3>
              <p>
                To the fullest extent permitted by law, [Your Company Name] will
                not be liable for any direct, indirect, incidental, special, or
                consequential damages arising out of or in connection with your
                use of our website or these Terms and Conditions.
              </p>
            </div>
            <div className="condition-item">
              <h3>Indemnification</h3>
              <p>
                You agree to indemnify and hold harmless [Your Company Name],
                its affiliates, officers, directors, employees, and agents from
                and against any claims, liabilities, damages, losses, or
                expenses arising out of or in connection with your use of our
                website or your violation of these Terms and Conditions.
              </p>
            </div>
            <div className="condition-item">
              <h3>Termination</h3>
              <p>
                We reserve the right to terminate or suspend your access to our
                website at any time, without notice, for any reason, including
                if we believe you have violated these Terms and Conditions.
              </p>
            </div>
            <div className="condition-item">
              <h3>Governing Law</h3>
              <p>
                These Terms and Conditions are governed by and construed in
                accordance with the laws of [Your Jurisdiction], without regard
                to its conflict of law principles.
              </p>
            </div>
          </div>
        </section>

        {/* Guidelines Section */}
        <section className="guidelines-section">
          <h2>Guidelines</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <ul>
            <li className="guideline-contact-1">
              <strong>Email:</strong> [Your Email Address]
            </li>
            <li className="guideline-contact-2">
              <strong>Phone:</strong> [Your Phone Number]
            </li>
            <li className="guideline-contact-3">
              <strong>Address:</strong> [Your Company Address]
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
