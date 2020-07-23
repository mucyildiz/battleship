export const Ship = (name, length) => {
    // ship of length 'length' created and initialized with no hits
    let isPlaced = false;

    const getName = () => {
        return name;
    }

    const getLength = () => {
        return length;
    }

    const _createdShip = Array(length).fill(false);

    const hitShip = (position) => {
        _createdShip[position] = true;
    }

    const isSunk = () => {
        return _createdShip.every((position) => position);
    }

    return { getName, getLength, hitShip, isSunk, isPlaced};

}