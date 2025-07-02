import Link from 'next/link';
import ImageCropper from '@components/ImageCropper';

const Form = ({ type, formData, setFormData, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-xl mx-auto flex flex-col items-start px-4">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Organization</span>
      </h1>
      <p className="desc text-left max-w-md">{type} your Institution</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* Name */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Name
          </span>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="form_input"
            required
          />
        </label>

        {/* Email */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Email
          </span>
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className="form_input"
            required
          />
        </label>

        {/* Phone */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Phone
          </span>
          <input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone"
            className="form_input"
            required
          />
        </label>

        {/* Address */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Address
          </span>
          <input
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Address"
            className="form_input"
            required
          />
        </label>

        {/* Image Upload */}
        <label>
          <ImageCropper
            setImage={(image) => setFormData({ ...formData, image })}
          />
        </label>

        {/* Type */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-300">
            Type
          </span>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="form_input"
            required
          >
            <option value="">Select Type</option>
            <option value="church">Church</option>
            <option value="organization">Organization</option>
            <option value="school">School</option>
          </select>

          {formData.type === 'church' && (
            <div className="mt-2">
              <input
                value={formData.denomination}
                onChange={(e) =>
                  setFormData({ ...formData, denomination: e.target.value })
                }
                placeholder="Denomination"
                className="form_input"
                required
              />
            </div>
          )}
        </label>

        {/* Submit + Cancel */}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-accent text-white rounded-full hover:bg-indigo-600 transition-colors"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
