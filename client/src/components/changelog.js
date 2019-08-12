import React from "react";

function ChangeLog() {
  return (
    <div style={{ textAlign: "left", padding: "2em" }}>
      <h2>Change log</h2>
      <p>
        <h5>1.0.1</h5>
        <ul>
          <li>Reinforced validations for the inputs fields.</li>
          <li>
            Placed a restraint on the length of the names and enforced the
            provision of the user's fullname.
          </li>
          <li>Disabled the input and submit fields upon submission.</li>
          <li>Added validation messages.</li>
        </ul>
        <h5>1.0.2</h5>
        <ul>
          <li>Bug Fixes </li>
        </ul>
        <h5>2.0.0</h5>
        <ul>
          <li>Admin Page and login feature added</li>
          <li>Only admin can now remove orders.</li>
        </ul>
        <h5>3.0.0</h5>
        <ul>
          <li>Added Google SSO for users to login</li>
          <li>
            Improved the aesthetics, include the time when the order was made in
            the order details.
          </li>
          <li>
            Optimized input validation technique - Added the option of taking
            either Fura or Nunu(Milk).
          </li>
          <li>
            Users can only remove orders they have created (while logged in of
            course); Admin reserves the right to perform any action user can
            perform.
          </li>
          <li>Fills in the name field automatically for logged in users.</li>
        </ul>
      </p>
      <h4>Coming Soon..</h4>
      <ul>
        <li>Users should be able to modify their orders</li>
        <li>Users should be able to pay for orders</li>
      </ul>
    </div>
  );
}

export default ChangeLog;
