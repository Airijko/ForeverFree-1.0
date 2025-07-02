import Link from 'next/link';
import ImageCropper from '@components/ImageCropper';

const Form = ({ type, formData, setFormData, submitting, handleSubmit }) => {
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setFormData({ ...formData, image: reader.result });
  //   };
  // };

  console.log(formData);
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Organization</span>
      </h1>
      <p className="desc text-left max-w-md">{type} your Institution</p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Name
          </span>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="form_input"
            required
          ></input>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
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
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
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
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
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
        <label>
          <ImageCropper
            setImage={(image) => setFormData({ ...formData, image })}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
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
          {formData.type == 'church' && (
            <div>
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

        <div className="flex-end mx-3 mb5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
