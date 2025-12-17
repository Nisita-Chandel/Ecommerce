// src/components/Section.jsx
const Section = ({ title, children }) => {
    return (
      <section className="mt-10 sm:mt-12">
        <div className="max-w-6xl mx-auto px-4">
          {title && (
            <h2 className="text-lg sm:text-xl font-semibold mb-4 uppercase">
              {title}
            </h2>
          )}
          {children}
        </div>
      </section>
    );
  };
  
  export default Section;
  