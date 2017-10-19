pragma solidity ^0.4.13;

/// @title Library implementing an array type which allows O(1) lookups on values.
/// @author Piper Merriam <pipermerriam@gmail.com>, Eric Olszewski <eolszewski@gmail.com>
/// Adapted from https://github.com/ethpm/ethereum-indexed-enumerable-set-lib/blob/master/contracts/IndexedEnumerableSetLib.sol
library StringSetLib {

    struct StringSet {
        string[] values;
        mapping(string => bool) exists;
        mapping(string => uint) indices;
    }

    modifier inBounds(StringSet storage self, uint index) {
        require(index < self.values.length);
        _;
    }

    modifier notEmpty(StringSet storage self) {
        require(self.values.length != 0);
        _;
    }

    function get(StringSet storage self, uint index) public constant
        inBounds(self, index)
        returns (string)
    {
        return self.values[index];
    }

    function set(StringSet storage self, uint index, string value) public
        inBounds(self, index)
        returns (bool)
    {
        if (self.exists[value])
            return false;
        self.values[index] = value;
        self.exists[value] = true;
        self.indices[value] = index;
        return true;
    }

    function add(StringSet storage self, string value) public
        returns (bool)
    {
        if (self.exists[value])
            return false;
        self.indices[value] = self.values.length;
        self.values.push(value);
        self.exists[value] = true;
        return true;
    }

    function remove(StringSet storage self, string value) public
        returns (bool)
    {
        if (!self.exists[value])
            return false;
        uint index = indexOf(self, value);
        pop(self, index);
        return true;
    }

    function pop(StringSet storage self, uint index) public
        inBounds(self, index)
        returns (string)
    {
        string value = get(self, index);

        if (index != self.values.length - 1) {
            string lastValue = last(self);
            self.exists[lastValue] = false;
            set(self, index, lastValue);
            self.indices[lastValue] = index;
        }
        self.values.length -= 1;

        delete self.indices[value];
        delete self.exists[value];

        return value;
    }

    function first(StringSet storage self) public constant
        notEmpty(self)
        returns (string)
    {
        return get(self, 0);
    }

    function last(StringSet storage self) public constant
        notEmpty(self)
        returns (string)
    {
        return get(self, self.values.length - 1);
    }

    function indexOf(StringSet storage self, string value) public constant
        returns (uint)
    {
        if (!self.exists[value])
            return uint(-1);
        return self.indices[value];
    }

    function contains(StringSet storage self, string value) public constant
        returns (bool)
    {
        return self.exists[value];
    }

    function size(StringSet storage self) public constant
        returns (uint)
    {
        return self.values.length;
    }
}
