import React from 'react';
import '../styles/BlogBodyGuide.css';

const BlogBodyGuide = () => {
    return (
        <div className="guide-container">
            <div className='header'>Blog Body Styling Guide</div>

            <section className="guide-section">
                <div className='title'>1. Adding Text Formatting</div>
                <p><strong>Bold Text:</strong> Use the <code>&lt;strong&gt;</code> tag to make text bold.</p>
                <p>Example: <code>&lt;strong&gt;This is bold text&lt;/strong&gt;</code></p>
                <p><strong>Result:</strong> <strong>This is bold text</strong></p>
                <br />
                <p><strong>Italic Text:</strong> Use the <code>&lt;i&gt;</code> tag to italicize text.</p>
                <p>Example: <code>&lt;i&gt;This is italic text&lt;/i&gt;</code></p>
                <p><strong>Result:</strong> <i>This is italic text</i></p>
                <br />
                <p><strong>Underlined Text:</strong> Use the <code>&lt;u&gt;</code> tag to underline text.</p>
                <p>Example: <code>&lt;u&gt;This is underlined text&lt;/u&gt;</code></p>
                <p><strong>Result:</strong> <u>This is underlined text</u></p>
            </section>

            <section className="guide-section">
                <div className='title'>2. Adding Headings</div>
                <p><strong>Headings:</strong> Use the <code>&lt;h1&gt; - &lt;h6&gt;</code> tags to create headings. <code>&lt;h1&gt;</code> is the largest, and <code>&lt;h6&gt;</code> is the smallest.</p>
                <p>Example: <code>&lt;h1&gt;Heading 1&lt;/h1&gt;</code></p>
                <p><strong>Result:</strong> <h1>Heading 1</h1></p>
                <p>Example: <code>&lt;h2&gt;Heading 2&lt;/h2&gt;</code></p>
                <p><strong>Result:</strong> <h2>Heading 2</h2></p>
            </section>

            <section className="guide-section">
                <div className='title'>3. Adding Superscript and Subscript</div>
                <p><strong>Superscript:</strong> Use the <code>&lt;sup&gt;</code> tag for superscript text (e.g., x²).</p>
                <p>Example: <code>&lt;sup&gt;2&lt;/sup&gt;</code></p>
                <p><strong>Result:</strong> x<sup>2</sup></p>
                <br />
                <p><strong>Subscript:</strong> Use the <code>&lt;sub&gt;</code> tag for subscript text (e.g., H₂O).</p>
                <p>Example: <code>&lt;sub&gt;2&lt;/sub&gt;</code></p>
                <p><strong>Result:</strong> H<sub>2</sub>O</p>
            </section>

            <section className="guide-section">
                <div className='title'>4. Inserting Images</div>
                <p><strong>Image:</strong> Use the <code>&lt;img&gt;</code> tag to add images to your blog.</p>
                <p>Example: <code>&lt;img src="image-url.jpg" alt="Description"&gt;</code></p>
                <p><strong>Result:</strong></p>
                {/* Random Image from picsum.photos */}
                <img src="https://picsum.photos/200" alt="Random Placeholder Image" className="guide-image" />
            </section>

            <section className="guide-section">
                <div className='title'>5. Adding Links</div>
                <p><strong>Link:</strong> Use the <code>&lt;a&gt;</code> tag to create hyperlinks in your blog body.</p>
                <p>Example: <code>&lt;a href="https://www.example.com"&gt;Click here&lt;/a&gt;</code></p>
                <p><strong>Result:</strong> <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Click here</a></p>
            </section>

            <section className="guide-section">
                <div className='title'>6. Adding Lists</div>
                <p><strong>Unordered List:</strong> Use the <code>&lt;ul&gt;</code> and <code>&lt;li&gt;</code> tags for unordered lists.</p>
                <p>Example:</p>
                <pre><code>{`&lt;ul&gt;
  &lt;li&gt;Item 1&lt;/li&gt;
  &lt;li&gt;Item 2&lt;/li&gt;
  &lt;li&gt;Item 3&lt;/li&gt;
&lt;/ul&gt;
`}</code></pre>
                <p><strong>Result:</strong></p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </section>

            <section className="guide-section">
                <div className='title'>7. Paragraph Tag (p)</div>
                <p><strong>Paragraph:</strong> The <code>&lt;p&gt;</code> tag is used to define a paragraph in HTML.</p>
                <p>Example: <code>&lt;p&gt;This is a paragraph&lt;/p&gt;</code></p>
                <p><strong>Result:</strong> This is a paragraph</p>
            </section>

            <section className="guide-section">
                <div className='title'>8. Paragraph Font Size</div>
                <p><strong>Font Size:</strong> You can adjust the font size of your paragraph text using the <code>font-size</code> CSS property.</p>
                <p>Example: <code>&lt;p style="font-size: 20px;"&gt;This text has a font size of 20px&lt;/p&gt;</code></p>
                <p><strong>Result:</strong></p>
                <p style={{ fontSize: '20px' }}>This text has a font size of 20px</p>
            </section>

            <section className="guide-section">
                <div className='title'>9. Paragraph Font Color</div>
                <p><strong>Font Color:</strong> You can adjust the font color of your paragraph text using the <code>color</code> CSS property.</p>
                <p>Example: <code>&lt;p style="color: blue;"&gt;This text is blue&lt;/p&gt;</code></p>
                <p><strong>Result:</strong></p>
                <p style={{ color: 'blue' }}>This text is blue</p>
            </section>

            <section className="guide-section">
                <div className='title'>10. Inline CSS Styling</div>
                <p><strong>Inline Styling:</strong> You can apply inline CSS styles directly to an element using the <code>style</code> attribute.</p>
                <p>Example: <code>&lt;p style="color: red; font-size: 18px;"&gt;This text is red and has a font size of 18px.&lt;/p&gt;</code></p>
                <p><strong>Result:</strong></p>
                <p style={{ color: 'red', fontSize: '18px' }}>This text is red and has a font size of 18px.</p>
            </section>

            <section className="guide-section">
                <div className='title'>11. Combining Tags</div>
                <p>You can combine tags like <code>&lt;strong&gt;</code> and <code>&lt;i&gt;</code> for more complex formatting.</p>
                <p>Example: <code>&lt;strong&gt;&lt;i&gt;This is bold and italic&lt;/i&gt;&lt;/strong&gt;</code></p>
                <p><strong>Result:</strong> <strong><i>This is bold and italic</i></strong></p>
            </section>

            <section className="guide-section">
                <div className="reference-guide">
                    <p style={{ textAlign: 'center' }}>For more references and detailed guides, visit: <a href="https://www.w3schools.com/html/" target="_blank" rel="noopener noreferrer">W3Schools HTML Tutorial</a></p>
                </div>
            </section>

        </div>
    );
};

export default BlogBodyGuide;
