import Link from 'next/link';

const Form = ({
  type,
  organization,
  setOrganization,
  submitting,
  handleSubmit,
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Organization</span>
      </h1>
      <p className="desc text-left max-w-md">{type} your organization</p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Name
          </span>
          <input
            value={organization.name}
            onChange={(e) =>
              setOrganization({ ...organization, name: e.target.value })
            }
            placeholder="register your organization name..."
            className="form_input"
            required
          ></input>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Email
          </span>
          <input
            value={organization.email}
            onChange={(e) =>
              setOrganization({ ...organization, email: e.target.value })
            }
            placeholder="email"
            className="form_input"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Phone
          </span>
          <input
            value={organization.phone}
            onChange={(e) =>
              setOrganization({ ...organization, phone: e.target.value })
            }
            placeholder="phone"
            className="form_input"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Address
          </span>
          <input
            value={organization.address}
            onChange={(e) =>
              setOrganization({ ...organization, address: e.target.value })
            }
            placeholder="email"
            className="form_input"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Church
          </span>
          <input
            value={organization.church}
            onChange={(e) =>
              setOrganization({ ...organization, church: e.target.value })
            }
            placeholder="church"
            className="form_input"
            required
          />
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
