import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "./constants/circularDocumentLinks.datatypes.constants"
import { LINK_NEW_DOCUMENT } from '../constants';
import '@testing-library/jest-dom'
import { logRoles } from '@testing-library/dom';


/**
 * VIEW a Person who is friend_with Person
 * checks if all fields are displayed correctly
 */
describe("Test Circular Document Links - VIEW MODE", () => {


	// view a document link  type property 
	test("View Document Link property", async () => {
		
		const config = CONST.VIEW_CONFIG

		// render FrameViewer 
		const { container } = render(<FrameViewer frame={config.frame}
			type={config.type}
			uiFrame={config.uiFrame}
			formData={config.formData}
			mode={config.mode}/>
		)

		const nameInput = document.getElementById("root_name")
		// check if nameInput root input is available
		expect(nameInput).toBeInTheDocument()
		// check if correct value is displayed
		expect(nameInput.value).toStrictEqual(config.formData["name"])

		const ageInput = document.getElementById("root_age")
		// check if ageInput root input is available
		expect(ageInput).toBeInTheDocument()
		expect(ageInput.value).toStrictEqual(config.formData["age"])

		// FILLING DEPTH 1
		const nameInput_1 = document.getElementById("root_friends_with_name_1")
		// check if nameInput_1 root input is available
		expect(nameInput_1).toBeInTheDocument()
		expect(nameInput_1.value).toStrictEqual(config.formData["friends_with"]["name"])

		const ageInput_1 = document.getElementById("root_friends_with_age_1")
		// check if ageInput_1 root input is available
		expect(ageInput_1).toBeInTheDocument()
		expect(ageInput_1.value).toStrictEqual(config.formData["friends_with"]["age"])

		// FILLING DEPTH 2
		const nameInput_2 = document.getElementById("root_friends_with_name_2")
		// check if nameInput_2 root input is available
		expect(nameInput_2).toBeInTheDocument()
		expect(nameInput_2.value).toStrictEqual(config.formData["friends_with"]["friends_with"]["name"])

		const ageInput_2 = document.getElementById("root_friends_with_age_2")
		// check if ageInput_2 root input is available
		expect(ageInput_2).toBeInTheDocument()
		expect(ageInput_2.value).toStrictEqual(config.formData["friends_with"]["friends_with"]["age"])
		

	})

	
})

