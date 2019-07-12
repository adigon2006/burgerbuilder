import React from 'react';
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

let wrapper;

beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
})

describe('<NavigationItems />', () => {
it('should render two render <NavigationItems /> elements if not authenticated', () => {
    
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
 });

//  it('should render three render <NavigationItems /> elements if authenticated', () => {
//      //wrapper = shallow(<NavigationItems isAuthenticated />);
//     wrapper.setProps({isAuthenticated:true});
//      expect(wrapper.find(NavigationItem)).toHaveLength(3);
//  });

//  it('should contains logout <NavigationItems /> elements if authenticated', () => {
//     //wrapper = shallow(<NavigationItems isAuthenticated />);
//    wrapper.setProps({isAuthenticated:true});
//     expect(wrapper.contains(<NavigationItem link="/logout"> Logout</NavigationItem>));
//     //expect(wrapper.find(NavigationItem)).toContain("/logout");
// });

});